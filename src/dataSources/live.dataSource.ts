import { DataSource } from 'apollo-datasource';
import Live from 'entities/live';
import IdGenerator from 'utils/idGenerator';
import Track from 'entities/track';
import User from 'entities/user';
import logger from 'utils/logger';

export class LiveDataSource extends DataSource {
    liveSessions: Map<Number, Live> = new Map<Number, Live>();
    idGenerator = IdGenerator();

    createLiveSession(owner: User, tracks: Track[]): Live {
        const liveId = this.idGenerator();
        const live = <Live>{
            liveId,
            owner,
            tracks,
            currentTrack: null,
            participants: [],
        };
        this.liveSessions.set(liveId, live);
        return live;
    }

    async addTrackToLive(liveId: number, track: Track): Promise<Live> {
        const liveSession = this.liveSessions.get(liveId);
        if (!liveSession) {
            throw new Error('Live session not found!');
        }
        logger.debug(liveSession.tracks.length);
        liveSession.tracks.push(track);
        return liveSession;
    }

    getLiveSession(liveId: number): Live {
        const liveSession = this.liveSessions.get(liveId);
        if (!liveSession) {
            throw new Error('Live session not found!');
        }
        return liveSession;
    }
}

export default new LiveDataSource();
