import { SpotifyImage, SpotifyFollowers, SpotifyExternalUrls } from './spotify-common-objects';

export interface CurrentUser {
  country: string;
  display_name: string;
  email: string;
  external_urls: SpotifyExternalUrls;
  followers: SpotifyFollowers;
  href: string;
  id: string;
  images: SpotifyImage[];
  product?: string; // Require "user-read-private" scope
  type: string;
  uri: string;
}
