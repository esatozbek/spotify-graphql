import ws from 'ws';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import schema from 'schema';

const subTransWs = new ws.Server({ noServer: true });
SubscriptionServer.create(
    {
        schema,
        execute,
        subscribe,
    },
    subTransWs
);

export default subTransWs;
