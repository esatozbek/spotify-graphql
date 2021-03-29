export type PlaylistResultResponse = {
    playlists: {
        href: string;
        items: PlaylistItemResponse[];
    };
};

export type PlaylistItemResponse = {
    id: string;
    name: string;
    description: string;
    href: string;
    owner: OwnerResponse;
    public: boolean;
    collaborative: boolean;
    tracks: TracksResponse;
    followers?: {
        href: undefined | string;
        total: number;
    };
};

export type OwnerResponse = {
    display_name: string;
    id: string;
    href: string;
};

export type TracksResponse = {
    href: string;
    total: number;
    items: {
        is_local: boolean;
        track: TrackResponse;
    }[];
};

export type TrackResponse = {
    id: string;
    name: string;
    artists: ArtistResponse[];
    album: AlbumResponse;
};

export type ArtistResponse = {
    id: string;
    name: string;
};

export type AlbumResponse = {
    id: String;
    name: String;
    artists: ArtistResponse[];
};

export type AudioFeaturesResponse = {
    duration_ms: number;
    key: number;
    mode: number;
    time_signature: number;
    acousticness: number;
    danceability: number;
    energy: number;
    instrumentalness: number;
    liveness: number;
    loudness: number;
    speechiness: number;
    valence: number;
    tempo: number;
    id: string;
    uri: string;
    track_href: string;
    analysis_url: string;
    type: string;
};

export type UserResponse = {
    display_name: string;
    external_urls: {
        spotify: string;
    };
    followers: {
        href: null;
        total: number;
    };
    href: string;
    id: string;
    images: [
        {
            height: null | number;
            url: string;
            width: null | number;
        }
    ];
    type: string;
    uri: string;
};
