import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { SpotifySearchItem } from 'services/interfaces';
import SpotifyService from 'services/SpotifyService';
import { useSnackbar } from 'notistack';
import { styled } from '@mui/system';
import spotifyLoginUrl from 'app/constants/spotifyLoginUrl';
import { spotifySearchOptions } from 'app/constants/spotifySearchOptions';
import SearchInput from 'view/SearchInput/SearchInput';
import Select from 'view/Select/Select';
import RecordButton from 'view/RecordButton/RecordButton';
import Card from 'view/Card/Card';
import Box from 'view/Box/Box';
import Grid from 'view/Grid/Grid';
import Button from 'view/Button/Button';
import LoadingOverlay from 'view/LoadingOverlay/LoadingOverlay';
import useSpeech from 'app/hooks/useSpeech';

const StyledBox = styled(Box)`
    position: relative;
    display: flex;
    justify-content: space-between;
    min-width: 400px;
    margin-bottom: 16px;
`;

const CenteredBox = styled(Box)`
    display: flex;
    align-items: center;
`;

export default function HomePage() {
    const { enqueueSnackbar } = useSnackbar();
    const { isListening, handleToggleListen, transcript, resetTranscript } = useSpeech();

    // const [isListening, setIsListening] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchType, setSearchType] = useState<string>(spotifySearchOptions[0].value);
    const [result, setResult] = useState<SpotifySearchItem[] | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const [loadingData, setLoadingData] = useState<boolean>(false);

    useEffect(() => {
        const token = SpotifyService.getToken();

        if (!token) {
            SpotifyService.login();
            setToken(token);
            return;
        }

        setToken(token);
    }, []);

    useEffect(() => {
        setSearchQuery(transcript);
    }, [transcript]);

    useEffect(() => {
        if (!searchQuery || !searchType) {
            setResult([]);
            return;
        }

        async function getResult(q: string, type: string): Promise<void> {
            setLoadingData(true);
            try {
                const result = await SpotifyService.getSearchResult(searchQuery, type);

                const albums = result.data.albums?.items,
                    artists = result.data.artists?.items,
                    tracks = result.data.tracks?.items,
                    responseData: SpotifySearchItem[] = albums || artists || tracks || [];

                setResult(responseData);
                setLoadingData(false);
            } catch (e) {
                const error = e as AxiosError;

                enqueueSnackbar(error.message, { variant: 'error' });
                setLoadingData(false);
            }
        }

        getResult(searchQuery, searchType);
    }, [searchQuery, searchType, enqueueSnackbar]);

    const renderResult = (): JSX.Element => {
        if (!result) return <></>;

        return (
            <>
                {result.map((item) => (
                    <Grid item xs={12} md={6} lg={4} key={item.id}>
                        <Card
                            title={item.name}
                            description={item.artists?.[0].name}
                            image={item.images?.[0]?.url}
                            link={item.external_urls.spotify}
                        />
                    </Grid>
                ))}
            </>
        );
    };

    const renderUserLogButtons = (): JSX.Element => {
        return (
            <>
                {!token && <Button href={spotifyLoginUrl}>Login to Spotify</Button>}
                {token && (
                    <Button
                        onClick={() => {
                            SpotifyService.logout();
                            setToken(null);
                            setResult([]);
                        }}
                    >
                        Logout
                    </Button>
                )}
            </>
        );
    };

    return (
        <Grid container>
            {loadingData && <LoadingOverlay />}
            <Grid container display="flex" justifyContent="center">
                {renderUserLogButtons()}
            </Grid>
            <Grid container display="flex" justifyContent="center" columnSpacing={{ xs: 2 }}>
                {token && (
                    <StyledBox>
                        <Select
                            label="type"
                            options={spotifySearchOptions}
                            defaultValue={searchType}
                            onChange={(value: string) => setSearchType(value)}
                        />
                        <SearchInput
                            placeholder="search"
                            debounceTime={500}
                            onChange={(value: string) => setSearchQuery(value)}
                            onClear={() => {
                                setSearchQuery('');
                                resetTranscript();
                            }}
                            defaultValue={searchQuery}
                        />
                        <CenteredBox>
                            <RecordButton onClick={handleToggleListen} recording={isListening} />
                        </CenteredBox>
                    </StyledBox>
                )}
            </Grid>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 2 }}>
                {renderResult()}
            </Grid>
        </Grid>
    );
}
