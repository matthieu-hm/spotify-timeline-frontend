export interface SpotifyImage {
  height: number;
  width: number;
  url: string;
}

export interface SpotifyExternalUrls {
  [propName: string]: string;
}

export interface SpotifyFollowers {
  href: string;
  total: number;
}

export interface SpotifyCursor {
  after: string;
}

export interface SpotifyCursorBasedPaging<T> {
    href: string;
    items: T[];
    limit: number;
    next: string;
    cursors: SpotifyCursor;
    total: number;
}
