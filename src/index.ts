import 'module-alias/register';

import server from 'server/server';
import Logger from 'utils/logger';

import 'config/dotenv.config';

const PORT = process.env.PORT || 3333;

const run = async () => {
    server.listen(PORT, () => {
        Logger.info(`Server started on port ${PORT}!`);
    });
};

run();
