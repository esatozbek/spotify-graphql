import Artist from './artist';
import Album from './album';
import AudioFeatures from './audio.features';

export default class Track {
    id: string;
    name: string;
    artists: Artist[];
    album: Album;
    audioFeatures?: AudioFeatures;
}
