import merge from 'lodash/merge';
import playlistResolvers from './playlist/playlist.resolver';
import trackResolvers from './track/track.resolvers';
import tracksResolver from './tracks/tracks.resolver';
import liveResolvers from './live/live.resolvers';
import meResolvers from './me/me.resover';

export default merge(
    {},
    playlistResolvers,
    trackResolvers,
    liveResolvers,
    tracksResolver,
    meResolvers
);
