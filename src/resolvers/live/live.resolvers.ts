import { withFilter } from 'apollo-server-express';
import Live from 'entities/live';
import logger from 'utils/logger';
import livePubSub from 'pubSub/livePubSub';
import { TRACK_ADDED_LIVE } from 'pubSub/constants';
import { TContext } from '../types';

const liveResolvers = {
    Query: {
        live(
            _: undefined,
            { liveId }: Record<string, any>,
            { dataSources: { liveDataSource } }: TContext
        ): Live {
            const liveIdNum = Number(liveId);
            return liveDataSource.getLiveSession(liveIdNum);
        },
    },
    Mutation: {
        async startLive(
            _: undefined,
            { ownerId, trackIds }: Record<string, any>,
            { dataSources: { liveDataSource, spotifyDataSource } }: TContext
        ): Promise<Live> {
            const user = await spotifyDataSource.getUser(ownerId);
            const tracks = await spotifyDataSource.getTracks(trackIds);

            if (!user || !user) {
                throw new Error('Parameters are not valid');
            }

            return liveDataSource.createLiveSession(user, tracks);
        },
        async addTrackToLive(
            _: undefined,
            { liveId, trackId }: Record<string, any>,
            { dataSources: { liveDataSource, spotifyDataSource } }: TContext
        ): Promise<Live> {
            const track = await spotifyDataSource.getTrack(trackId);

            if (!track) {
                throw new Error('Parameters are not valid');
            }

            const live = await liveDataSource.addTrackToLive(liveId, track);
            livePubSub.publish(TRACK_ADDED_LIVE, { live });
            return live;
        },
    },
    Subscription: {
        live: {
            subscribe: withFilter(
                () => livePubSub.asyncIterator([TRACK_ADDED_LIVE]),
                (payload, variables) => {
                    logger.info(JSON.stringify(payload.live));
                    logger.info(JSON.stringify(variables));
                    return variables.liveId === payload.live.liveId;
                }
            ),
        },
    },
};

export default liveResolvers;
