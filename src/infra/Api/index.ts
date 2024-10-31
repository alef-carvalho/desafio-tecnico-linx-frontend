import axios, {AxiosRequestConfig} from 'axios';
import {getAccessToken} from "../../auth/context/utils.ts";

export class HttpError {
    public readonly message: string;
    public readonly status: number;

    constructor(message: string | string[], status: number) {
        this.message = message instanceof Array ? message.join('\n') : message;
        this.status = status;
    }
}

export interface HttpRequestConfig extends AxiosRequestConfig {
    skipAuth?: boolean;
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 30 * 1000 // 30s
});

api.interceptors.request.use(async (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
        config.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return config;
});

function handleError(error: any) {
    if (error?.response) {
        switch (error.response?.status) {
            case 422:
                return new HttpError(error.response?.data?.errors?.reduce((prev: string, curr: { message: string }) =>
                    prev.concat(curr.message + '\n'), ""), 422);
            case 500:
                return new HttpError('Erro interno do servidor', 500);
            default:
                return new HttpError(error.response?.data?.message, error.response?.status);
        }
    } else if (error?.request) {
        return new HttpError('Verifique sua conexão com a internet.', 0);
    } else {
        return new HttpError('Erro ao realizar solicitação: ' + error?.message, 0);
    }
}

export function sendGetAsync<T = any>(url: string, config: HttpRequestConfig = {}): Promise<T> {
    return new Promise((resolve, reject) => {
        api.get<T>(url, config)
            .then(({ data }) => {
                resolve(data);
            })
            .catch((error) => {
                reject(handleError(error));
            });
    });
}

export function sendPostAsync<T = any>(url: string, data = {}, config: HttpRequestConfig = {}): Promise<T> {
    return new Promise((resolve, reject) => {
        api.post<T>(url, data, config)
            .then(({ data }) => {
                resolve(data);
            })
            .catch((error) => {
                reject(handleError(error));
            });
    });
}

export function sendPutAsync<T = any>(url: string, data = {}, config: HttpRequestConfig = {}): Promise<T> {
    return new Promise((resolve, reject) => {
        api.put<T>(url, data, config)
            .then(({ data }) => {
                resolve(data);
            })
            .catch((error) => {
                reject(handleError(error));
            });
    });
}

export function sendDeleteAsync<T = any>(url: string, config: HttpRequestConfig = {}): Promise<T> {
    return new Promise((resolve, reject) => {
        api.delete<T>(url, config)
            .then(({ data }) => {
                resolve(data);
            })
            .catch((error) => {
                reject(handleError(error));
            });
    });
}
