import axios, { AxiosError, AxiosResponse } from "axios";
import { NEXT_API_URL } from "../../config";

export const AuthAPI = {
    login: loginQuery,
    logout: logoutQuery,
    register: registerQuery,
    refreshToken: refreshTokenQuery,
};

export type AuthLoginAPIData = APIDataWithAccessToken & APIDataWithRefreshToken;
export type AuthRefreshTokenAPIData = APIDataWithAccessToken;

interface APIDataWithAccessToken {
    access: string;
}

interface APIDataWithRefreshToken {
    refresh: string;
}

function loginQuery(data: { login: string; password: string }) {
    return axios
        .post(NEXT_API_URL + "/api/auth/login/", data)
        .then((res: AxiosResponse<AuthLoginAPIData>) => res)
        .catch((err: AxiosError<object>) => err.response as AxiosResponse);
}

function logoutQuery() {
    return axios
        .get(NEXT_API_URL + "/api/auth/logout/")
        .then((res: AxiosResponse<object>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

function registerQuery(data: {
    login: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    re_password: string;
}) {
    return axios
        .post(NEXT_API_URL + "/api/auth/register/", data)
        .then((res: AxiosResponse<object>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

function refreshTokenQuery() {
    return axios
        .get(NEXT_API_URL + "/api/auth/refresh/")
        .then((res: AxiosResponse<AuthRefreshTokenAPIData>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}
