import axios from 'axios';
import { SpotifySearchResponse } from 'services/interfaces';

function logout(): void {
    window.localStorage.removeItem('token');
}

function login(): void {
    const hash: string | undefined = window.location.hash;
    const tokenFromStorage = getToken();

    if (tokenFromStorage || !hash) return;

    const tokenFromUrl = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        ?.split('=')[1];

    if (!tokenFromUrl) return;

    window.location.hash = '';
    window.location.pathname = '';
    window.localStorage.setItem('token', tokenFromUrl);
}

function getToken(): string | null {
    return window.localStorage.getItem('token');
}

async function getSearchResult(q: string, type: string) {
    return axios.get<SpotifySearchResponse>('https://api.spotify.com/v1/search', {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
        params: {
            q,
            type,
        },
    });
}

const SpotifyService = {
    login,
    logout,
    getToken,
    getSearchResult,
};

export default SpotifyService;
