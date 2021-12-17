import axios, { AxiosError, AxiosResponse } from "axios";
import { BACKEND_API_URL } from "../../config";
import { Product } from "../types/Product";

export const QuizAPI = { getProducts };

function getProducts(data: { price: number }) {
    return axios
        .post(BACKEND_API_URL + "/api/quiz/list/", {
            ...data,
            form_factor: "test",
        })
        .then((res: AxiosResponse<Array<Product>>) => res)
        .catch((err: AxiosError<any>) => err.response as AxiosResponse);
}
