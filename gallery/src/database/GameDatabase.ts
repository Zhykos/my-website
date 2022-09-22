export interface GameDatabase {
  name: string;
  releaseYear: number;
  igdb: string;
  screenshots: ScreenshotDatabase[];
}

export interface ScreenshotDatabase {
  platform: string;
  link: string;
  languages: string[];
  version: string;
}
