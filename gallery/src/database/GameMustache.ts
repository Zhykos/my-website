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
