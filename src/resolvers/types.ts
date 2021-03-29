import { SpotifyDataSource } from 'dataSources/spotify.dataSource';
import { LiveDataSource } from 'dataSources/live.dataSource';

export type TContext = {
    dataSources: {
        liveDataSource: LiveDataSource;
        spotifyDataSource: SpotifyDataSource;
    };
};
