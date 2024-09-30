import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class RestManager {
    private axiosInstance!: AxiosInstance;

    constructor(baseURL: string = '') {
        this.axiosInstance = axios.create({
            baseURL: baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            },
        });

        this.axiosInstance.interceptors.response.use(this.handleSuccess, this.handleError);
    }

    private handleSuccess(response: AxiosResponse) {
        return response.data;
    }

    private handleError(error: AxiosError) {
        if (error.response) {
            // La richiesta è stata fatta e il server ha risposto con uno stato diverso da 2xx
            console.error('Response error:', error.response.data);
            return Promise.reject({
                status: error.response.status,
                message: error.response.data,
            });
        } else if (error.request) {
            // La richiesta è stata fatta ma non è stata ricevuta alcuna risposta
            console.error('Request timeout. No answer during request.');
            return Promise.reject({
                status: 408,
                message: 'Request timeout. No answer during request.',
            });
        } else {
            console.error('Error during request:', error.message);
            return Promise.reject({ status: 500, message: error.message });
        }
    }

    public get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
        return this.axiosInstance.get(url, config);
    }

    public post<T>(url: string, data: Record<string, unknown>, config: AxiosRequestConfig = {}): Promise<T> {
        return this.axiosInstance.post(url, data, config);
    }
}
