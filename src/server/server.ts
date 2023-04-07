import express from 'express';
import { createServer } from 'http';
import { GRAPHQL_WS } from 'subscriptions-transport-ws';
import { GRAPHQL_TRANSPORT_WS_PROTOCOL } from 'graphql-ws';
import querystring from 'querystring';
import { writeKeyValueToFile } from 'utils/fileFacade';
import apolloServer from './apolloServer';
import wsServer from './wsServer';
import subTransWs from './subTransServer';
import Logger from 'utils/logger';

const app = express();

app.get('/authorize', (req, res) => {
    res.redirect(
        'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: process.env.CLIENT_ID,
                scope: 'user-library-read playlist-read-private user-read-private',
                redirect_uri: 'http://localhost:3333/callback',
                // state: state,
            })
    );
});

app.get('/callback', (req, res) => {
    Logger.info(req.query.code);
    writeKeyValueToFile('.keys', 'CODE', req.query.code?.toString());
    res.send(req.query.code?.toString());
});

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
