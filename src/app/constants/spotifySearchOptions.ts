import { SpotifySearchType } from 'services/enums/SpotifySearchType';
import { SelectOption } from 'view/Select/Select';

export const spotifySearchOptions: SelectOption[] = [
    { label: SpotifySearchType.track, value: SpotifySearchType.track },
    { label: SpotifySearchType.album, value: SpotifySearchType.album },
    { label: SpotifySearchType.artist, value: SpotifySearchType.artist },
];
