import axios, { AxiosError, AxiosResponse } from "axios";
import { BACKEND_API_URL } from "../../config";
import { ProductType } from "../types/ProductType";

export const TypesAPI = { getTypes };

function getTypes() {
    return axios
        .get(BACKEND_API_URL + "/types/")
        .then((res: AxiosResponse<Array<ProductType>>) => res)
        .catch((err: AxiosError<any>) => err.response as AxiosResponse);
}
