import Playlist from 'entities/playlist';
import { TContext } from '../types';

const playlistResolvers = {
    Query: {
        async playlists(
            _: undefined,
            { query }: Record<string, any>,
            { dataSources: { spotifyDataSource } }: TContext
        ): Promise<Playlist[]> {
            return await spotifyDataSource.search({ q: query, type: 'playlist' });
        },
        async playlist(
            _: undefined,
            { id }: Record<string, any>,
            { dataSources: { spotifyDataSource } }: TContext
        ): Promise<Playlist> {
            return await spotifyDataSource.getPlaylist(id);
        },
    },
};

export default playlistResolvers;
