export class IGDBGame {
  constructor(
    public readonly coverId: number,
    public readonly name: string,
    public readonly releaseDatesIds: number[],
    public readonly slug: string,
    public readonly url: string
  ) {}
}

export class IGDBCover {
  constructor(public readonly id: number, public readonly url: string) {}
}

export class IGDBPlatform {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly slug: string
  ) {}
}

export class IGDBReleaseDate {
  constructor(
    public readonly platform: number,
    public readonly year: number
  ) {}
}
