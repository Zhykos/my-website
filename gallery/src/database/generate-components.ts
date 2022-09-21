import * as fs from 'fs';
import * as Mustache from 'mustache';
import { GameDatabase, ScreenshotDatabase } from './GameDatabase';
import { GameMustache, ScreenshotMustache } from './GameMustache';

main();

function main(): void {
  fs.rmSync('../generated-components/', { recursive: true });
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
    imgSrcName: getImageNameFromIgdbUrl(gameDatabase.igdb),
    componentName: getComponentNameFromIgdbUrl(gameDatabase.igdb),
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

function getImageNameFromIgdbUrl(url: string): string {
  return getLastPartFromIgdbUrl(url) + '.jpg';
}

function getComponentNameFromIgdbUrl(url: string): string {
  const lastPart: string = getLastPartFromIgdbUrl(url);
  return mapSnakeToPascalCase(lastPart);
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
  const gamesComponents: string[] = gamesDatabase
    .map((game) => getComponentNameFromIgdbUrl(game.igdb))
    .sort();

  const sectionGamesComponentMustache: string = fs
    .readFileSync('section-games-component.mustache')
    .toString();
  const generatedSectionGamesComponent: string = Mustache.render(
    sectionGamesComponentMustache,
    { games: gamesComponents }
  );

  fs.mkdirSync(`../generated-components/section-games`);
  fs.writeFileSync(
    `../generated-components/section-games/index.jsx`,
    generatedSectionGamesComponent
  );
}
