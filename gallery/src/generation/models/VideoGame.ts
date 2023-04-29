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
    public readonly version: string | undefined,
    public readonly countPhotos: number,
    public readonly countVideos: number,
    public readonly primaryPhotoURL: string
  ) {}
}
