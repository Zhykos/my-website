export class FlickrRootPhotoset {
  constructor(
    public readonly page: number,
    public readonly pages: number,
    public readonly total: number,
    public readonly photosets: FlickrPhotoset[]
  ) {}
}

export class FlickrPhotoset {
  constructor(
    public readonly countPhotos: number,
    public readonly countVideos: number,
    public readonly title: string,
    public readonly description: string,
    public readonly id: string
  ) {}
}

export class FlickrVideoGameAlbum {
  constructor(
    public readonly countPhotos: number,
    public readonly countVideos: number,
    public readonly title: string,
    public readonly url: string,
    public readonly gameSlug: string,
    public readonly platformVersionSlug: string,
    public readonly playedOnPlatformSlug: string,
    public readonly version: string,
    public readonly languages: string
  ) {}
}

export class FlickrDescription {
  constructor(
    public readonly type: FlickrDescriptionTypeEnum,
    public readonly igdbSlug: string,
    public readonly platformVersionIgdbSlug: string,
    public readonly playedOnPlatformIgdbSlug: string,
    public readonly languages: string[],
    public readonly version: string,
  ) {}
}

export enum FlickrDescriptionTypeEnum {
  GAME = 'g',
  EVENT = 'e',
}
