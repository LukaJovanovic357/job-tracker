import axios, { AxiosError } from 'axios';
import { getUserFromLocalStorage } from './localStorage';
import { clearStore } from '../features/user/userSlice';

const apiUrl =
    process.env.NODE_ENV === 'production'
        ? 'https://container-service-1.82upn46fa2lac.eu-central-1.cs.amazonlightsail.com/api/v1/'
        : 'http://localhost:5000/api/v1/';

const customFetch = axios.create({
    baseURL: apiUrl
    // baseURL: 'http://localhost:5000/api/v1/'
});

customFetch.interceptors.request.use(config => {
    const user = getUserFromLocalStorage();
    if (user) {
        config.headers['authorization'] = `Bearer ${user.token}`;
    }
    return config;
});

export const checkForUnauthorizedResponse = (
    error: AxiosError,
    thunkAPI: any
) => {
    if (error.response?.status === 401) {
        thunkAPI.dispatch(clearStore(''));
        return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
    }
    return thunkAPI.rejectWithValue(
        (error.response?.data as { msg: string }).msg
    );
};

export default customFetch;
