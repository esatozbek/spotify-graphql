import { DataSource } from 'apollo-datasource';
import AuthService from 'service/auth.service';
import ApiService from 'service/api.service';
import { SpotifySearchParams } from 'service/types';
import Playlist from 'entities/playlist';
import Track from 'entities/track';
import AudioFeatures from 'entities/audio.features';
import User from 'entities/user';
import { Tracks } from 'entities/playlist';
import {
    PlaylistResultResponse,
    PlaylistItemResponse,
    TracksResponse,
    TrackResponse,
    AudioFeaturesResponse,
    UserResponse,
} from './types';
import { SPOTIFY_API } from './constants';

export class SpotifyDataSource extends DataSource {
    private _offset: number;
    constructor() {
        super();
        this._offset = 0;
    }

    get headers() {
        return { Authorization: `Bearer ${AuthService.token}` };
    }

    async get(path: string, queryParams?: Record<string, string>) {
        try {
            return await ApiService.get(path, queryParams, this.headers);
        } catch (e) {
            await AuthService.getNewAccessKey();
            return await ApiService.get(path, queryParams, this.headers);
        }
    }

    async search(params: SpotifySearchParams): Promise<Playlist[]> {
        const resp: PlaylistResultResponse = await this.get(`${SPOTIFY_API}/search`, params);

        return resp.playlists.items.map(
            (item) =>
                <Playlist>{
                    id: item.id,
                    description: item.description,
                    name: item.name,
                    collaborative: item.collaborative,
                    owner: { id: item.owner?.id, displayName: item.owner?.display_name },
                    public: item.public,
                    followers: item.followers?.total,
                    tracks: {
                        total: item.tracks.total,
                        items: null,
                    },
                }
        );
    }

    async getPlaylist(id: string): Promise<Playlist> {
        const resp: PlaylistItemResponse = await this.get(`${SPOTIFY_API}/playlists/${id}`);

        return <Playlist>{
            id: resp.id,
            description: resp.description,
            name: resp.name,
            collaborative: resp.collaborative,
            owner: { id: resp.owner?.id, displayName: resp.owner?.display_name },
            public: resp.public,
            followers: resp.followers?.total,
            tracks: {
                total: resp.tracks.total,
                items: resp.tracks.items.filter((item) => !item.is_local).map((item) => item.track),
            },
        };
    }

    async getPlaylistTracks(id: string): Promise<Tracks> {
        const resp: TracksResponse = await this.get(`${SPOTIFY_API}/playlists/${id}/tracks`);
        return <Tracks>{
            total: resp.total,
            items: resp.items.filter((item) => !item.is_local).map((item) => item.track),
        };
    }

    async getAudioFeatures(id: string): Promise<AudioFeatures> {
        return await this.get(`${SPOTIFY_API}/audio-features/${id}`);
    }

    async getMultipleAudioFeatures(ids: string[]): Promise<AudioFeaturesResponse[]> {
        return (await this.get(`${SPOTIFY_API}/audio-features?ids=${ids.join(',')}`))
            .audio_features;
    }

    async getTrack(id: string): Promise<TrackResponse> {
        const resp = await this.get(`${SPOTIFY_API}/tracks/${id}`);

        return <Track>{
            id: resp.id,
            album: resp.album,
            artists: resp.artists,
            name: resp.name,
        };
    }

    async getTracks(ids: string[]): Promise<TrackResponse[]> {
        const resp = await this.get(`${SPOTIFY_API}/tracks?ids=${ids.join(',')}`);
        return resp.tracks;
    }

    async getUser(id: string): Promise<User> {
        const resp: UserResponse = await this.get(`${SPOTIFY_API}/users/${id}`);
        return <User>{
            id: resp.id,
            displayName: resp.display_name,
        };
    }

    async mePlaylists(): Promise<Playlist[]> {
        const resp = await this.get(`${SPOTIFY_API}/me/playlists`, {
            limit: '50',
            offset: String(this._offset),
        });
        this._offset += 50;
        console.log(resp.items.length);
        return resp.items;
    }

    async meTracks(offset: number): Promise<TrackResp> {
        const resp = await this.get(`${SPOTIFY_API}/me/tracks`, {
            limit: '50',
            offset: String(offset),
        });
        return resp;
    }
}

type TrackResp = {
    items: { added_at: string; track: Track }[];
    next: string | null;
    total: number;
};

export default new SpotifyDataSource();
