import isEmpty from 'lodash/isEmpty';
import Track from 'entities/track';
import AudioFeatures from 'entities/audio.features';
import { TContext } from '../types';

const trackResolvers = {
    Query: {
        async track(
            _: undefined,
            { id }: Record<string, any>,
            { dataSources: { spotifyDataSource } }: TContext
        ): Promise<Track> {
            return await spotifyDataSource.getTrack(id);
        },
    },
    Track: {
        async audioFeatures(
            parent: Track,
            _: Record<string, any>,
            { dataSources: { spotifyDataSource } }: TContext
        ): Promise<AudioFeatures> {
            if (parent.audioFeatures && !isEmpty(parent.audioFeatures)) {
                return parent.audioFeatures;
            }
            return await spotifyDataSource.getAudioFeatures(parent.id);
        },
    },
};

export default trackResolvers;
