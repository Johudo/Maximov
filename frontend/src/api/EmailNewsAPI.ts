import axios, { AxiosError, AxiosResponse } from "axios";
import { BACKEND_API_URL } from "../../config";

export const EmailNewsAPI = { subscribe };

function subscribe(data: { email: string }) {
    return axios
        .post(BACKEND_API_URL + "/api/email/create/", data)
        .then((res: AxiosResponse<{}>) => res)
        .catch((err: AxiosError<any>) => err.response as AxiosResponse);
}
