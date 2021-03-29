import fs from 'fs';
import Logger from 'utils/logger';
import { writeToFile, readFromFile } from 'utils/fileFacade';
import ApiService from './api.service';
import { SPOTIFY_AUTH_API } from './constants';
import { AccessTokenResponse } from './types';
class AuthService {
    private _token: string;

    constructor() {
        const keyFileContent = readFromFile('.keys');

        if (!keyFileContent) {
            Logger.warn('Token not found!');
            Logger.warn('Creating token file!');
            writeToFile('.keys');
        } else {
            this._token = keyFileContent;
        }

        this.getNewAccessKey = this.getNewAccessKey.bind(this);
    }

    get token(): string {
        return this._token;
    }

    private async _getAccessKey(): Promise<AccessTokenResponse> {
        return await ApiService.post(
            SPOTIFY_AUTH_API,
            { grant_type: 'client_credentials' },
            {
                Authorization: `Basic ${process.env.BASE64_TOKEN}`,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            true
        );
    }

    async getNewAccessKey(): Promise<void> {
        Logger.debug('Getting new access key');

        const resp = await this._getAccessKey();
        this._token = resp['access_token'];
        Logger.debug('New access key succesfully taken');
        const result = writeToFile('.keys', resp['access_token']);
        if (!result) {
            Logger.warn('New access key write file error! ');
        } else {
            Logger.debug('New access key written to file ');
        }
    }
}

export default new AuthService();
