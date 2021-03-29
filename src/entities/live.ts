import Track from './track';
import User from './user';

class Live {
    liveId: number;
    owner: User;
    participants: User[];
    tracks: Track[];
    currentTrack?: {
        startTime: number;
        track: Track;
    } | null;
}

export default Live;
