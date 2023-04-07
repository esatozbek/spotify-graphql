import isEmpty from 'lodash/isEmpty';
import fetch, { Response, HeadersInit } from 'node-fetch';
import Logger from 'utils/logger';
import { getFormEncodedParams, prepareQueryParams } from 'utils/api';

class ApiService {
    handleResponse(resp: Response) {
        if (!resp.ok) {
            Logger.debug(`Request failed of ${resp.statusText}`);
            Logger.debug(resp.status);
            console.log(resp);
            throw new Error('Request failed');
        }
        return resp.json();
    }

    async get(path: string, queryParams?: Record<string, string>, headers?: HeadersInit) {
        Logger.debug(`GET request to ${path}`);

        const resp = await fetch(
            `${path}${isEmpty(queryParams) ? '' : prepareQueryParams(queryParams!)}`,
            {
                method: 'GET',
                headers,
            }
        );
        return this.handleResponse(resp);
    }

    async post(
        path: string,
        body: Record<string, any>,
        headers: HeadersInit,
        formEncoded: boolean
    ) {
        Logger.debug(`POST request to ${path}`);
        const resp = await fetch(`${path}`, {
            method: 'POST',
            headers: {
                ...headers,
            },
            body: formEncoded ? getFormEncodedParams(body).toString() : JSON.stringify(body),
        });
        return this.handleResponse(resp);
    }
}

export default new ApiService();
