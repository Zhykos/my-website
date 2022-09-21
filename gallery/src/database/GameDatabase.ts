export interface GameDatabase {
  name: string;
  releaseYear: number;
  igdb: string;
  screenshots: ScreenshotDatabase[];
}

export interface ScreenshotDatabase {
  platform: 'PlayStation 4';
  link: string;
  languages: string[];
  version: 'gold';
}
