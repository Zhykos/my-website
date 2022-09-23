import * as fs from 'fs';
import * as Mustache from 'mustache';
import { EventDatabase } from './EventDatabase';
import { EventMustache } from './EventMustache';
import { GameDatabase, ScreenshotDatabase } from './GameDatabase';
import { GameMustache, ScreenshotMustache } from './GameMustache';

const NUMBER_COMPONENT_PREFIX = 'NumberPrefix';

main();

function main(): void {
  if (fs.existsSync('../generated-components/')) {
    fs.rmSync('../generated-components/', { recursive: true });
  }
  fs.mkdirSync('../generated-components/');

  generateAllGamesComponents();
  generateSectionGamesComponent();

  generateAllEventsComponents();
  generateSectionEventsComponent();
}

function generateAllGamesComponents(): void {
  const gamesDatabaseRawData: string = fs
    .readFileSync('_db_games.json')
    .toString();
  const gamesDatabase: GameDatabase[] = JSON.parse(gamesDatabaseRawData);
  gamesDatabase.forEach((gameDatabase) => generateGameComponent(gameDatabase));
}

function generateGameComponent(gameDatabase: GameDatabase): void {
  const gameMustache: GameMustache = mapGame(gameDatabase);
  const gameComponentMustache: string = fs
    .readFileSync('game-component.mustache')
    .toString();
  const generatedGameComponent: string = Mustache.render(
    gameComponentMustache,
    gameMustache
  );

  fs.mkdirSync(`../generated-components/${gameMustache.componentName}`);
  fs.writeFileSync(
    `../generated-components/${gameMustache.componentName}/index.jsx`,
    generatedGameComponent
  );
}

function mapGame(gameDatabase: GameDatabase): GameMustache {
  return {
    name: gameDatabase.name,
    releaseYear: gameDatabase.releaseYear,
    igdb: gameDatabase.igdb,
    imgSrcName: getImageNameFromGameDatabase(gameDatabase),
    componentName: getComponentNameFromGameDatabase(gameDatabase),
    screenshots: gameDatabase.screenshots.map(mapScreenshot),
  };
}

function mapScreenshot(gameDatabase: ScreenshotDatabase): ScreenshotMustache {
  return {
    platform: gameDatabase.platform,
    link: gameDatabase.link,
    languages: gameDatabase.languages.join(', '),
    version: gameDatabase.version,
  };
}

function getImageNameFromGameDatabase(gameDatabase: GameDatabase): string {
  return getLastPartFromIgdbUrl(gameDatabase.igdb) + '.jpg';
}

function getComponentNameFromGameDatabase(gameDatabase: GameDatabase): string {
  const lastPart: string = getLastPartFromIgdbUrl(gameDatabase.igdb);
  let prefixIfNumber = '';
  if (lastPart.match(/^\d/)) {
    prefixIfNumber = NUMBER_COMPONENT_PREFIX; // Workaround because Gatsby fails if the component starts with a number
  }
  return (
    prefixIfNumber + mapSnakeToPascalCase(lastPart) + gameDatabase.releaseYear
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

function generateSectionGamesComponent(): void {
  const gamesDatabaseRawData: string = fs
    .readFileSync('_db_games.json')
    .toString();
  const gamesDatabase: GameDatabase[] = JSON.parse(gamesDatabaseRawData);
  const gamesComponents: string[] = [...gamesDatabase]
    .sort((gameDatabase1, gameDatabase2) => {
      const component1: string =
        getComponentNameFromGameDatabase(gameDatabase1);
      const component2: string =
        getComponentNameFromGameDatabase(gameDatabase2);
      if (component1 === component2) {
        return gameDatabase1.releaseYear - gameDatabase2.releaseYear;
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
    })
    .map((gameDatabase) => getComponentNameFromGameDatabase(gameDatabase));

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

function generateAllEventsComponents(): void {
  const eventsDatabaseRawData: string = fs
    .readFileSync('_db_events.json')
    .toString();
  const eventsDatabase: EventDatabase[] = JSON.parse(eventsDatabaseRawData);
  eventsDatabase.forEach((eventDatabase) =>
    generateEventComponent(eventDatabase)
  );
}

function generateEventComponent(eventDatabase: EventDatabase): void {
  const eventMustache: EventMustache = mapEvent(eventDatabase);
  const eventComponentMustache: string = fs
    .readFileSync('event-component.mustache')
    .toString();
  const generatedEventComponent: string = Mustache.render(
    eventComponentMustache,
    eventMustache
  );

  fs.mkdirSync(`../generated-components/${eventMustache.componentName}`);
  fs.writeFileSync(
    `../generated-components/${eventMustache.componentName}/index.jsx`,
    generatedEventComponent
  );
}

function mapEvent(eventDatabase: EventDatabase): EventMustache {
  return {
    name: eventDatabase.name,
    year: eventDatabase.year,
    country: eventDatabase.country,
    link: eventDatabase.link,
    website: eventDatabase.website,
    componentName: getComponentNameFromEventDatabase(eventDatabase),
    imgSrcName: getImageNameFromEventDatabase(eventDatabase),
  };
}

function getComponentNameFromEventDatabase(
  eventDatabase: EventDatabase
): string {
  return (
    mapSnakeToPascalCase(eventDatabase.name.replace(/ /g, '')) +
    eventDatabase.year
  );
}

function getImageNameFromEventDatabase(eventDatabase: EventDatabase): string {
  return getComponentNameFromEventDatabase(eventDatabase) + '.jpg';
}

function generateSectionEventsComponent(): void {
  const eventsDatabaseRawData: string = fs
    .readFileSync('_db_events.json')
    .toString();
  const eventsDatabase: EventDatabase[] = JSON.parse(eventsDatabaseRawData);
  const eventsComponents: string[] = [...eventsDatabase]
    .sort((eventDatabase1, eventDatabase2) => {
      const component1: string =
        getComponentNameFromEventDatabase(eventDatabase1);
      const component2: string =
        getComponentNameFromEventDatabase(eventDatabase2);
      if (component1 === component2) {
        return eventDatabase1.year - eventDatabase2.year;
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
