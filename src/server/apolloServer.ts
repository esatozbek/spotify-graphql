import { ApolloServer } from 'apollo-server-express';
import { spotifyDataSource, liveDataSource } from 'dataSources';
import schema from 'schema';

const apolloServer = new ApolloServer({
    dataSources: () => {
        return {
            spotifyDataSource,
            liveDataSource,
        };
    },
    schema,
    playground: {
        subscriptionEndpoint: 'ws://localhost:3333/sub',
    },
});

export default apolloServer;
