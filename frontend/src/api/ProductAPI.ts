import axios, { AxiosError, AxiosResponse } from "axios";
import { BACKEND_API_URL } from "../../config";
import { Product } from "../types/Product";

export const ProductAPI = { getProduct, getProductsList };

function getProduct(id: number) {
    return axios
        .get(BACKEND_API_URL + `/products/${id}/`)
        .then((res: AxiosResponse<Product>) => res)
        .catch((err: AxiosError<any>) => err.response as AxiosResponse);
}

function getProductsList() {
    return axios
        .get(BACKEND_API_URL + "/products/")
        .then((res: AxiosResponse<Array<Product>>) => res)
        .catch((err: AxiosError<any>) => err.response as AxiosResponse);
}
