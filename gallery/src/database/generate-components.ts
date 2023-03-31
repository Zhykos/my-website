import apicalypse from 'apicalypse';
import axios, { AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';
import * as Flickr from 'flickr-sdk';
import * as fs from 'fs';
import * as Mustache from 'mustache';
import { min, sift, unique } from 'radash';
import {
  FlickrEventAlbum,
  FlickrPhotoset,
  FlickrRootPhotoset,
  FlickrVideoGameAlbum,
  IGDBCover,
  IGDBGame,
  IGDBPlatform,
  IGDBReleaseDate,
  VideoGame,
} from './models';

dotenv.config();

const NUMBER_COMPONENT_PREFIX = 'NumberPrefix';

const main = async () => {
  const rootPhotoset: FlickrRootPhotoset = await retrieveFlickrPhotosets();

  const flickrAlbums: (FlickrVideoGameAlbum | FlickrEventAlbum)[] =
    transformFlickr(rootPhotoset);
  const videoGameAlbums: FlickrVideoGameAlbum[] = flickrAlbums.filter(
    (album) => album instanceof FlickrVideoGameAlbum
  ) as FlickrVideoGameAlbum[];
  const eventAlbums: FlickrEventAlbum[] = flickrAlbums.filter(
    (album) => album instanceof FlickrEventAlbum
  ) as FlickrEventAlbum[];

  const token: string = await retrieveAuthenticationTokenFromIGDB();

  await timeout(500);

  const igdbGames: IGDBGame[] = await retrieveVideoGamesFromIGDB(
    videoGameAlbums,
    token
  );

  await timeout(500);

  const igdbCovers: IGDBCover[] = await retrieveCoversFromIGDB(
    igdbGames,
    token
  );

  await timeout(500);

  const igdbPlatforms: IGDBPlatform[] = await retrievePlatformsFromIGDB(
    videoGameAlbums,
    token
  );

  await timeout(500);

  const igdbReleaseDates: IGDBReleaseDate[] =
    await retrieveReleaseDatesFromIGDB(igdbGames, token);

  const videoGames: VideoGame[] = consolidateVideoGames(
    igdbGames,
    igdbCovers,
    igdbPlatforms,
    igdbReleaseDates,
    videoGameAlbums
  );

  generateAllComponents(videoGames, eventAlbums);
};

async function retrieveFlickrPhotosets(): Promise<FlickrRootPhotoset> {
  const flickr = new Flickr(process.env.FLICKR_SECRET, null);
  const res: Request = await flickr.photosets.getList({
    user_id: process.env.FLICKR_USER_ID,
    primary_photo_extras: 'url_m',
  });

  const photosetsRaw: any = JSON.parse(JSON.stringify(res.body)).photosets;

  return new FlickrRootPhotoset(
    photosetsRaw.page,
    photosetsRaw.pages,
    photosetsRaw.total,
    photosetsRaw.photoset.map(
      (p: any) =>
        new FlickrPhotoset(
          p.count_photos,
          p.count_videos,
          p.title._content,
          p.description._content,
          p.id,
          p.primary_photo_extras.url_m
        )
    )
  );
}

function transformFlickr(
  rootPhotoset: FlickrRootPhotoset
): (FlickrVideoGameAlbum | FlickrEventAlbum)[] {
  const flickrAlbums: (FlickrVideoGameAlbum | FlickrEventAlbum | null)[] =
    rootPhotoset.photosets.map((photoset) => {
      const matchArray: RegExpMatchArray | null =
        photoset.description.match(/vgg-meta:\s*(.+)$/m);
      if (matchArray) {
        const vggMeta: any = JSON.parse(
          `{${Buffer.from(matchArray[1].trim(), 'base64')}}`
        );
        if (vggMeta.t === 'g') {
          return new FlickrVideoGameAlbum(
            photoset.countPhotos,
            photoset.countVideos,
            photoset.title,
            `https://www.flickr.com/photos/${process.env.FLICKR_USER_ID}/albums/${photoset.id}`,
            photoset.primaryPhotoURL,
            vggMeta.s,
            vggMeta.p,
            vggMeta.o,
            mapVggMetaToVersion(vggMeta.v)
          );
        }

        // Events
        return new FlickrEventAlbum(
          photoset.countPhotos,
          photoset.countVideos,
          vggMeta.n,
          `https://www.flickr.com/photos/${process.env.FLICKR_USER_ID}/albums/${photoset.id}`,
          photoset.primaryPhotoURL,
          vggMeta.y,
          vggMeta.c,
          vggMeta.cy
        );
      }
      return null;
    });
  return sift(flickrAlbums);
}

function mapVggMetaToVersion(shortVersion: string): string {
  switch (shortVersion) {
    case 'r':
      return 'release';
    default:
      return '';
  }
}

async function retrieveAuthenticationTokenFromIGDB(): Promise<string> {
  const authResponse: AxiosResponse = await axios.post(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.IGDB_CLIENT_ID}&client_secret=${process.env.IGDB_CLIENT_SECRET}&grant_type=client_credentials`
  );

  return JSON.parse(JSON.stringify(authResponse.data)).access_token;
}

async function retrieveVideoGamesFromIGDB(
  videoGameAlbums: FlickrVideoGameAlbum[],
  token: string
): Promise<IGDBGame[]> {
  const slugs: string = videoGameAlbums
    .map((album) => `"${album.gameSlug}"`)
    .join(',');

  const requestOptions = createIGDBRequestOptions(token);

  const response: AxiosResponse = await apicalypse(requestOptions)
    .fields('*')
    .where(`slug = (${slugs})`)
    .request('/games');

  return response.data.map(
    (obj: any) =>
      new IGDBGame(obj.cover, obj.name, obj.release_dates, obj.slug, obj.url)
  );
}

async function retrieveCoversFromIGDB(
  igdbGames: IGDBGame[],
  token: string
): Promise<IGDBCover[]> {
  const imageIds: string = igdbGames
    .map((igdbGame) => igdbGame.coverId)
    .join(',');

  const requestOptions = createIGDBRequestOptions(token);

  const response: AxiosResponse = await apicalypse(requestOptions)
    .fields('*')
    .where(`id = (${imageIds})`)
    .request('/covers');
  return response.data.map((obj: any) => new IGDBCover(obj.id, obj.url));
}

async function retrievePlatformsFromIGDB(
  videoGameAlbums: FlickrVideoGameAlbum[],
  token: string
): Promise<IGDBPlatform[]> {
  const platformVersionIds: string[] = videoGameAlbums.flatMap(
    (album) => `"${album.platformVersionSlug}"`
  );

  const playedOnIds: string[] = videoGameAlbums.flatMap(
    (album) => `"${album.playedOnPlatformSlug}"`
  );

  const platformIds: string = unique([
    ...platformVersionIds,
    ...playedOnIds,
  ]).join(',');

  const requestOptions = createIGDBRequestOptions(token);

  const response: AxiosResponse = await apicalypse(requestOptions)
    .fields('*')
    .where(`slug = (${platformIds})`)
    .request('/platforms');
  return response.data.map(
    (obj: any) => new IGDBPlatform(obj.id, obj.name, obj.slug)
  );
}

async function retrieveReleaseDatesFromIGDB(
  igdbGames: IGDBGame[],
  token: string
): Promise<IGDBReleaseDate[]> {
  const releaseDateIds: string = unique(
    igdbGames.flatMap((igdbGame) => igdbGame.releaseDatesIds)
  ).join(',');

  const requestOptions = createIGDBRequestOptions(token);

  const response: AxiosResponse = await apicalypse(requestOptions)
    .fields('*')
    .where(`id = (${releaseDateIds})`)
    .request('/release_dates');
  return response.data.map(
    (obj: any) => new IGDBReleaseDate(obj.platform, obj.y)
  );
}

function createIGDBRequestOptions(token: string) {
  return {
    queryMethod: 'body',
    method: 'post',
    baseURL: 'https://api.igdb.com/v4',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Client-ID': process.env.IGDB_CLIENT_ID,
    },
    responseType: 'json',
    timeout: 5000,
  };
}

function consolidateVideoGames(
  igdbGames: IGDBGame[],
  igdbCovers: IGDBCover[],
  igdbPlatforms: IGDBPlatform[],
  igdbReleaseDates: IGDBReleaseDate[],
  videoGameAlbums: FlickrVideoGameAlbum[]
): VideoGame[] {
  return igdbGames.map((igdbGame) => {
    const album: FlickrVideoGameAlbum | undefined = videoGameAlbums.find(
      (flickrAlbum) => flickrAlbum.gameSlug == igdbGame.slug
    );

    const coverURL: string | undefined = igdbCovers.find(
      (c) => c.id == igdbGame.coverId
    )?.url;

    const platformVersion: IGDBPlatform | undefined = igdbPlatforms.find(
      (p) => p.slug == album?.platformVersionSlug
    );

    const platformPlayedOne: string | undefined = igdbPlatforms.find(
      (p) => p.slug == album?.playedOnPlatformSlug
    )?.name;

    const releaseDates: IGDBReleaseDate[] = igdbReleaseDates.filter(
      (d) => d.platform == platformVersion?.id
    );

    const releaseYear: number | null = min(
      releaseDates.map((date) => date.year)
    );

    return new VideoGame(
      `https:${coverURL}`,
      igdbGame.name,
      igdbGame.slug,
      platformVersion?.name,
      platformPlayedOne,
      releaseYear,
      igdbGame.url,
      album?.url,
      album?.version,
      album.countPhotos,
      album.countVideos,
      album.primaryPhotoURL
    );
  });
}

function timeout(ms: number): Promise<number> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ======================================================

function generateAllComponents(
  videoGames: VideoGame[],
  eventAlbums: FlickrEventAlbum[]
): void {
  if (fs.existsSync('../generated-components/')) {
    fs.rmSync('../generated-components/', { recursive: true });
  }
  fs.mkdirSync('../generated-components/');

  videoGames.forEach((videoGame) => generateGameComponent(videoGame));
  generateSectionGamesComponent(videoGames);

  eventAlbums.forEach((eventAlbum) => generateEventComponent(eventAlbum));
  generateSectionEventsComponent(eventAlbums);

  generateHeaderComponent(videoGames.length, eventAlbums.length);
}

function generateHeaderComponent(nbGames: number, nbEvents: number): void {
  const headerMustache: string = fs.readFileSync('header.mustache').toString();
  const generatedComponent: string = Mustache.render(headerMustache, {
    nbGames,
    nbEvents,
  });
  fs.mkdirSync('../generated-components/header');
  fs.writeFileSync(
    '../generated-components/header/index.jsx',
    generatedComponent
  );
}

function generateGameComponent(videoGame: VideoGame): void {
  const componentName: string = getComponentNameFromGameDatabase(videoGame);
  const gameComponentMustache: string = fs
    .readFileSync('game-component.mustache')
    .toString();
  const generatedGameComponent: string = Mustache.render(
    gameComponentMustache,
    { ...videoGame, componentName }
  );

  fs.mkdirSync(`../generated-components/${componentName}`);
  fs.writeFileSync(
    `../generated-components/${componentName}/index.jsx`,
    generatedGameComponent
  );
}

function getComponentNameFromGameDatabase(videoGame: VideoGame): string {
  const lastPart: string = getLastPartFromIgdbUrl(videoGame.slug);
  let prefixIfNumber = '';
  if (lastPart.match(/^\d/)) {
    prefixIfNumber = NUMBER_COMPONENT_PREFIX; // Workaround because Gatsby fails if the component starts with a number
  }
  return (
    prefixIfNumber + mapSnakeToPascalCase(lastPart) + videoGame.releaseYear
  );
}

function getLastPartFromIgdbUrl(url: string): string {
  if (url.endsWith('/')) {
    throw new Error(
      `L'URL de IGDB ne doit pas terminer par un slash: '${url}'.`
    );
  }
  const split: string[] = url.split('/');
  return split[split.length - 1];
}

function mapSnakeToPascalCase(str: string): string {
  const split: string[] = str.split('-');
  return split
    .map((splitStr) => splitStr.charAt(0).toUpperCase() + splitStr.substring(1))
    .join('');
}

function compareVideoGames(
  videoGame1: VideoGame,
  videoGame2: VideoGame
): number {
  const component1: string = getComponentNameFromGameDatabase(videoGame1);
  const component2: string = getComponentNameFromGameDatabase(videoGame2);

  if (component1 === component2) {
    return videoGame1.releaseYear - videoGame2.releaseYear;
  }

  if (
    component1.startsWith(NUMBER_COMPONENT_PREFIX) &&
    component2.startsWith(NUMBER_COMPONENT_PREFIX)
  ) {
    return component1.localeCompare(component2);
  }

  if (component1.startsWith(NUMBER_COMPONENT_PREFIX)) {
    return -1;
  }

  if (component2.startsWith(NUMBER_COMPONENT_PREFIX)) {
    return 1;
  }

  return component1.localeCompare(component2);
}

function generateSectionGamesComponent(videoGames: VideoGame[]): void {
  const gamesComponents: string[] = [...videoGames]
    .sort(compareVideoGames)
    .map((videoGame) => getComponentNameFromGameDatabase(videoGame));

  const sectionGamesComponentMustache: string = fs
    .readFileSync('section-games-component.mustache')
    .toString();
  const generatedSectionGamesComponent: string = Mustache.render(
    sectionGamesComponentMustache,
    { nbGames: gamesComponents.length, games: gamesComponents }
  );

  fs.mkdirSync(`../generated-components/section-games`);
  fs.writeFileSync(
    `../generated-components/section-games/index.jsx`,
    generatedSectionGamesComponent
  );
}

function generateEventComponent(eventAlbum: FlickrEventAlbum): void {
  const componentName: string = getComponentNameFromEventDatabase(eventAlbum);
  const eventComponentMustache: string = fs
    .readFileSync('event-component.mustache')
    .toString();
  const generatedEventComponent: string = Mustache.render(
    eventComponentMustache,
    { ...eventAlbum, componentName }
  );

  fs.mkdirSync(`../generated-components/${componentName}`);
  fs.writeFileSync(
    `../generated-components/${componentName}/index.jsx`,
    generatedEventComponent
  );
}

function getComponentNameFromEventDatabase(
  eventAlbum: FlickrEventAlbum
): string {
  return (
    mapSnakeToPascalCase(eventAlbum.title.replace(/ /g, '')) + eventAlbum.year
  );
}

function generateSectionEventsComponent(eventAlbums: FlickrEventAlbum[]): void {
  const eventsComponents: string[] = [...eventAlbums]
    .sort((eventAlbum1, eventAlbum2) => {
      const component1: string = getComponentNameFromEventDatabase(eventAlbum1);
      const component2: string = getComponentNameFromEventDatabase(eventAlbum2);
      if (component1 === component2) {
        return eventAlbum1.year - eventAlbum2.year;
      }
      return component1.localeCompare(component2);
    })
    .map((eventDatabase) => getComponentNameFromEventDatabase(eventDatabase));

  const sectionEventsComponentMustache: string = fs
    .readFileSync('section-events-component.mustache')
    .toString();
  const generatedSectionEventsComponent: string = Mustache.render(
    sectionEventsComponentMustache,
    { nbEvents: eventsComponents.length, events: eventsComponents }
  );

  fs.mkdirSync(`../generated-components/section-events`);
  fs.writeFileSync(
    `../generated-components/section-events/index.jsx`,
    generatedSectionEventsComponent
  );
}

// ======================================================

main();

// ======================================================
