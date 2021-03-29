export type AccessTokenResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
};

export type SpotifySearchParams = {
    q: string;
    type: 'album' | 'artist' | 'playlist' | 'track' | 'show' | 'episode';
};
