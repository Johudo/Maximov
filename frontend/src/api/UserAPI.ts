import axios, { AxiosError, AxiosResponse } from "axios";
import { BACKEND_API_URL } from "../../config";
import { User } from "../types/User";
import { APIUtils } from "../utils/APIUtils";

export const UserAPI = {
    getCurrenUserInfo,
    resetPassword,
    resetPasswordConfirm,
    setNewPassword,
    setNewEmail,
    updateCurrentUserInfo,
};

export interface UserInfoAPIData extends User {}

function getCurrenUserInfo() {
    const defaultHeaders: any = APIUtils.setDefaultHeader();

    return axios
        .get(BACKEND_API_URL + "/auth/users/me/", { headers: defaultHeaders })
        .then((res: AxiosResponse<UserInfoAPIData>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

function resetPassword(data: { email: string }) {
    const defaultHeaders: any = APIUtils.setDefaultHeader();

    return axios
        .post(BACKEND_API_URL + "/auth/users/reset_password/", data, { headers: defaultHeaders })
        .then((res: AxiosResponse<{}>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

function resetPasswordConfirm(data: { new_password: string; uid: string; token: string }) {
    const defaultHeaders: any = APIUtils.setDefaultHeader();

    return axios
        .post(BACKEND_API_URL + "/auth/users/reset_password_confirm/", data, { headers: defaultHeaders })
        .then((res: AxiosResponse<{}>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

function setNewPassword(data: { current_password: string; new_password: string; re_new_password: string }) {
    const defaultHeaders: any = APIUtils.setDefaultHeader();

    return axios
        .post(BACKEND_API_URL + "/auth/users/set_password/", data, { headers: defaultHeaders })
        .then((res: AxiosResponse<{}>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

function setNewEmail(data: { new_email: string; current_password: string }) {
    const defaultHeaders: any = APIUtils.setDefaultHeader();

    return axios
        .post(BACKEND_API_URL + "/auth/users/set_email/", data, { headers: defaultHeaders })
        .then((res: AxiosResponse<{}>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

function updateCurrentUserInfo(data: { first_name: string; last_name: string }) {
    const defaultHeaders: any = APIUtils.setDefaultHeader();

    return axios
        .put(BACKEND_API_URL + "/auth/users/me/", data, { headers: defaultHeaders })
        .then((res: AxiosResponse<{}>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}
