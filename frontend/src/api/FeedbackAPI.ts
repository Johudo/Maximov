import axios, { AxiosError, AxiosResponse } from "axios";
import { BACKEND_API_URL } from "../../config";

export const FeedbackAPI = { createFeedback };

function createFeedback(data: { email: string; name: string; phone: string; message: string }) {
    return axios
        .post(BACKEND_API_URL + "/api/feedback/create/", data)
        .then((res: AxiosResponse<{}>) => res)
        .catch((err: AxiosError<any>) => err.response as AxiosResponse);
}
