export default `
    type Query {
        playlist(id: String): Playlist
        playlists(query: String): [Playlist]
        track(id: String): Track
        live(liveId: Int): Live
    }

    type Mutation {
        startLive(ownerId: String, trackIds: [String]): Live
        addTrackToLive(liveId: Int, trackId: String): Live
        deleteTrackFromLive(liveId: Int, trackId: String): Live
    }

    type Subscription {
        live(liveId: Int): Live
    }

    type Playlist {
        id: String!
        name: String!
        description: String
        followers: Int
        public: Boolean
        owner: User
        collaborative: Boolean
        tracks: Tracks!
    }

    type User {
        id: String
        displayName: String
    }

    type Tracks {
        total: Int!
        items: [Track]
    }

    type Artist {
        id: String
        name: String
    }

    type Album {
        id: String
        name: String
        artists: [Artist]
    }

    type Track {
        id: String
        name: String
        artists: [Artist]
        album: Album
        audioFeatures: AudioFeatures
    }

    type AudioFeatures {
        acousticness: Float
        danceability: Float
        energy: Float
        instrumentalness: Float
        liveness: Float
        loudness: Float
        valence: Float
        tempo: Float
    }

    type Live {
        liveId: Int
        owner: User!
        participants: [User]
        tracks: [Track]
        currentTrack: CurrentTrack
    }

    type CurrentTrack {
        startTime: Int
        track: Track
    }
`;
