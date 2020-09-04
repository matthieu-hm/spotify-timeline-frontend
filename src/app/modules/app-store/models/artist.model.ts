import { SpotifyCursorBasedPaging, SpotifyExternalUrls, SpotifyFollowers, SpotifyImage } from './spotify-common-objects';


export interface Artist {
  external_urls: SpotifyExternalUrls;
  followers: SpotifyFollowers;
  genres: string[];
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface ArtistFollowedPaging {
  artists: SpotifyCursorBasedPaging<Artist>;
}
