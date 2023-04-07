import Logger from 'utils/logger';
import { readValueFromFile, writeKeyValueToFile } from 'utils/fileFacade';
import ApiService from './api.service';
import { SPOTIFY_AUTH_API } from './constants';
import { AccessTokenResponse } from './types';

class AuthService {
    private _token: string;
    private _code: string;

    constructor() {
        const accessToken = readValueFromFile('.keys', 'ACCESS_TOKEN');
        const code = readValueFromFile('.keys', 'CODE');

        if (!accessToken) {
            Logger.info('Token not found!');
        } else {
            this._token = accessToken;
        }

        if (!code) {
            Logger.info('code not found!');
        } else {
            this._code = code;
        }

        console.log('accessToken', accessToken);
        console.log('code', code);

        this.getNewAccessKey = this.getNewAccessKey.bind(this);
    }

    get token(): string {
        return this._token;
    }

    private async _getAccessKey(): Promise<AccessTokenResponse> {
        return await ApiService.post(
            SPOTIFY_AUTH_API,
            {
                grant_type: 'authorization_code',
                code: this._code,
                redirect_uri: 'http://localhost:3333/callback',
            },
            {
                Authorization: `Basic ${new Buffer(
                    process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
                ).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            true
        );
    }

    async getNewAccessKey(): Promise<void> {
        Logger.debug('Getting new access key');

        const resp = await this._getAccessKey();
        console.log('resp', resp);
        this._token = resp['access_token'];
        Logger.debug('New access key succesfully taken');
        const result = writeKeyValueToFile('.keys', 'ACCESS_TOKEN', resp['access_token']);
        if (!result) {
            Logger.warn('New access key write file error! ');
        } else {
            Logger.debug('New access key written to file ');
        }
    }
}

export default new AuthService();
