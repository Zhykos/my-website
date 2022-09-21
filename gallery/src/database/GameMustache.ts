export interface GameMustache {
  name: string;
  releaseYear: number;
  igdb: string;
  imgSrcName: string;
  componentName: string;
  screenshots: ScreenshotMustache[];
}

export interface ScreenshotMustache {
  platform: string;
  link: string;
  languages: string;
  version: string;
}
