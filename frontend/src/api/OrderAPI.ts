import axios, { AxiosError, AxiosResponse } from "axios";
import { BACKEND_API_URL } from "../../config";

export const OrderAPI = { createOrder };

function createOrder(data: {
    name: string;
    phone: string;
    email: string;
    index: string;
    region: string;
    city: string;
    street: string;
    house: string;
    comments: string;
    delivery: string;
    payment: string;
}) {
    return axios
        .post(BACKEND_API_URL + "/api/order/create/", data)
        .then((res: AxiosResponse<{}>) => res)
        .catch((err: AxiosError<any>) => err.response as AxiosResponse);
}
