import axios, { AxiosError, AxiosResponse } from "axios";
import { BACKEND_API_URL } from "../../config";

export const ActivateAPI = { activateEmail };

function activateEmail(data: { uid: string; token: string }) {
    return axios
        .post(BACKEND_API_URL + "/auth/users/activation/", data)
        .then((res: AxiosResponse<{}>) => res)
        .catch((err: AxiosError<any>) => err.response as AxiosResponse);
}
