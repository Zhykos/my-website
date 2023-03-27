export class GameMustache {
  constructor(
    public readonly name: string,
    public readonly releaseYear: number,
    public readonly igdbURL: string,
    public readonly coverURL: string,
    public readonly componentName: string,
    public readonly screenshots: ScreenshotMustache[]
  ) {}
}

export class ScreenshotMustache {
  constructor(
    public readonly platform: string,
    public readonly link: string,
    public readonly languages: string,
    public readonly version: string
  ) {}
}

export class VideoGame {
  constructor(
    public readonly coverURL: string | undefined,
    public readonly name: string,
    public readonly slug: string,
    public readonly platformVersion: string | undefined,
    public readonly platformPlayedOn: string | undefined,
    public readonly releaseYear: number | null,
    public readonly igdbURL: string,
    public readonly flickrURL: string | undefined,
    public readonly version: string | undefined
  ) {}
}
