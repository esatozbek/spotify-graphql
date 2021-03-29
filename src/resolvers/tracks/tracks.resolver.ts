import isEmpty from 'lodash/isEmpty';
import { AudioFeaturesResponse } from 'dataSources/types';
import { Tracks } from 'entities/playlist';
import Track from 'entities/track';
import { TContext } from '../types';

const tracksResolver = {
    Tracks: {
        async items(
            parent: Tracks,
            { id }: Record<string, any>,
            { dataSources: { spotifyDataSource } }: TContext
        ): Promise<Track[]> {
            let tracks: Track[];
            if (parent.items && !isEmpty(parent.items)) {
                tracks = parent.items;
            } else {
                tracks = (await spotifyDataSource.getPlaylistTracks(id)).items || [];
            }

            let audioFeatures: AudioFeaturesResponse[] = [];

            if (tracks.length < 100) {
                const audioFeaturesResp = await spotifyDataSource.getMultipleAudioFeatures(
                    tracks.map((track) => track.id)
                );

                audioFeatures = audioFeaturesResp;
            } else {
                const slicedTracks: Track[][] = [];
                for (let i = 0; i < tracks.length / 100; i++) {
                    slicedTracks.push(tracks.slice(i * 100, (i + 1) * 100));
                }
                slicedTracks.forEach(async (subTracks) => {
                    const audioFeaturesResp = await spotifyDataSource.getMultipleAudioFeatures(
                        subTracks.map((track) => track.id)
                    );
                    audioFeatures = [...audioFeatures, ...audioFeaturesResp];
                });
            }

            return tracks.map((track) => {
                return {
                    ...track,
                    audioFeatures: audioFeatures.find((af) => af.id === track.id),
                };
            });
        },
    },
};

export default tracksResolver;
