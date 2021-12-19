import axios, { AxiosError, AxiosResponse } from "axios";
import { BACKEND_API_URL } from "../../config";
import { HeaderType } from "../types/HeaderType";
import { User } from "../types/User";
import { NextAPIUtils } from "../utils/NextAPIUtils";

export const UserAPI = {
    getCurrenUserInfo,
    updateCurrentUserInfo,
};

export type UserInfoAPIData = User;

function getCurrenUserInfo() {
    const defaultHeaders: HeaderType = NextAPIUtils.setDefaultHeader();

    return axios
        .get(BACKEND_API_URL + "/api/users/me/", { headers: defaultHeaders })
        .then((res: AxiosResponse<UserInfoAPIData>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}

function updateCurrentUserInfo(data: {
    login?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    birthday?: string;
    phone?: string;
}) {
    const defaultHeaders: HeaderType = NextAPIUtils.setDefaultHeader();

    return axios
        .patch(BACKEND_API_URL + "/api/users/me/", data, { headers: defaultHeaders })
        .then((res: AxiosResponse<{}>) => res)
        .catch((err: AxiosError) => err.response as AxiosResponse);
}
