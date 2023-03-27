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

abstract class AbstractFlickrAlbum {
  constructor(
    public readonly countPhotos: number,
    public readonly countVideos: number,
    public readonly title: string,
    public readonly url: string
  ) {}
}

export class FlickrVideoGameAlbum extends AbstractFlickrAlbum {
  constructor(
    countPhotos: number,
    countVideos: number,
    title: string,
    url: string,
    public readonly gameSlug: string,
    public readonly platformVersionSlug: string,
    public readonly playedOnPlatformSlug: string,
    public readonly version: string,
    public readonly languages: string
  ) {
    super(countPhotos, countVideos, title, url);
  }
}

export class FlickrEventAlbum extends AbstractFlickrAlbum {
  constructor(
    countPhotos: number,
    countVideos: number,
    title: string,
    url: string,
    public readonly year: number,
    public readonly country: string,
    public readonly city: string
  ) {
    super(countPhotos, countVideos, title, url);
  }
}

export class FlickrDescription {
  constructor(
    public readonly type: FlickrDescriptionTypeEnum,
    public readonly igdbSlug: string,
    public readonly platformVersionIgdbSlug: string,
    public readonly playedOnPlatformIgdbSlug: string,
    public readonly languages: string[],
    public readonly version: string
  ) {}
}

export enum FlickrDescriptionTypeEnum {
  GAME = 'g',
  EVENT = 'e',
}
