export interface ArtistImage {
  height: number;
  width: number;
  url: string;
}

export interface Artist {
  external_urls: {
    [propName: string]: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: ArtistImage[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface ArtistFollowedResponse {
  artists: {
    items: Artist[];
    next: string;
    total: number;
    cursors: {
      after: string;
    };
    limit: number;
    href: string;
  };
}
