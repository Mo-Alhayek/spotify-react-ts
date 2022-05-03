import { SpotifySearchType } from 'services/enums/SpotifySearchType';

interface Artist {
    external_urls: { spotify: string }[];
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface SpotifySearchItem {
    album_type: string;
    artists?: Artist[];
    available_markets: string[];
    external_urls: { spotify?: string };
    href: string;
    id: string;
    images?: { height: number; url: string }[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: SpotifySearchType;
    uri: string;
}

export interface SpotifySearchResponse {
    artists?: { items: SpotifySearchItem[] };
    tracks?: { items: SpotifySearchItem[] };
    albums?: { items: SpotifySearchItem[] };
}
