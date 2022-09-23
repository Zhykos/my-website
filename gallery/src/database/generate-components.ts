import * as fs from 'fs';
import * as Mustache from 'mustache';
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
    imgSrcName: getImageNameFrom(gameDatabase),
    componentName: getComponentNameFrom(gameDatabase),
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

function getImageNameFrom(gameDatabase: GameDatabase): string {
  return getLastPartFromIgdbUrl(gameDatabase.igdb) + '.jpg';
}

function getComponentNameFrom(gameDatabase: GameDatabase): string {
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
      const component1: string = getComponentNameFrom(gameDatabase1);
      const component2: string = getComponentNameFrom(gameDatabase2);
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
    .map((gameDatabase) => getComponentNameFrom(gameDatabase));

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
