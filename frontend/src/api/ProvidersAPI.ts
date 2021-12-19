import axios, { AxiosError, AxiosResponse } from "axios";
import { BACKEND_API_URL } from "../../config";
import { ProductProvider } from "../types/ProductProvider";

export const ProvidersAPI = { getProviders };

function getProviders() {
    return axios
        .get(BACKEND_API_URL + "/api/providers/")
        .then((res: AxiosResponse<Array<ProductProvider>>) => res)
        .catch((err: AxiosError<Array<ProductProvider>>) => err.response as AxiosResponse);
}
