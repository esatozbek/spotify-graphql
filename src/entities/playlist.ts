import Track from './track';
import User from './user';

export default class Playlist {
    id: string;
    name: string;
    description: string;
    followers?: number;
    public: boolean;
    owner: User;
    collaborative: boolean;
    tracks: Tracks;
}

export class Tracks {
    total: number;
    items?: Track[] | null;
}
