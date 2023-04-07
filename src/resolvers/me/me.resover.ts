import Playlist from 'entities/playlist';
import Track from 'entities/track';
import { TContext } from '../types';
import Logger from 'utils/logger';

let trackOffset = 0;

const meResolvers = {
    Query: {
        async mePlaylists(
            _: undefined,
            {}: Record<string, any>,
            { dataSources: { spotifyDataSource } }: TContext
        ): Promise<Playlist[]> {
            return await spotifyDataSource.mePlaylists();
        },
        async meTracks(
            _: undefined,
            {}: Record<string, any>,
            { dataSources: { spotifyDataSource } }: TContext
        ): Promise<Track[]> {
            trackOffset = 0;
            let tracks: Track[] = [];
            while (true) {
                const resp = await spotifyDataSource.meTracks(trackOffset);
                Logger.debug(`Fetched tracks ${trackOffset} of ${resp.total}`);
                const trackItems = resp.items.map((trackItem) => {
                    const track = trackItem.track;
                    return {
                        ...track,
                    };
                });
                tracks = tracks.concat(trackItems);
                if (!resp.next) {
                    break;
                }
                trackOffset += 50;
                await new Promise((resolve) => setTimeout(() => resolve(null), 100));
            }
            return tracks;
        },
    },
};

export default meResolvers;
