import express from 'express';
import { createServer } from 'http';
import { GRAPHQL_WS } from 'subscriptions-transport-ws';
import { GRAPHQL_TRANSPORT_WS_PROTOCOL } from 'graphql-ws';
import apolloServer from './apolloServer';
import wsServer from './wsServer';
import subTransWs from './subTransServer';

const app = express();
apolloServer.applyMiddleware({ app });
const server = createServer(app);

server.on('upgrade', (req, socket, head) => {
    const protocol = req.headers['sec-websocket-protocol'];
    const protocols = Array.isArray(protocol)
        ? protocol
        : protocol?.split(',').map((p: string) => p.trim());

    const wss =
        protocols?.includes(GRAPHQL_WS) && !protocols.includes(GRAPHQL_TRANSPORT_WS_PROTOCOL)
            ? subTransWs
            : wsServer;
    wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
    });
});

export default server;
