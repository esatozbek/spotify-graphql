import ws from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { execute, subscribe } from 'graphql';
import schema from 'schema';

const wsServer = new ws.Server({
    noServer: true,
    path: '/sub',
});

useServer(
    {
        schema,
        execute,
        subscribe,
    },
    wsServer
);

export default wsServer;
