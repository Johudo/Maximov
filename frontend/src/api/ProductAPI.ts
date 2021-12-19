import axios, { AxiosError, AxiosResponse } from "axios";
import { BACKEND_API_URL } from "../../config";
import { Product } from "../types/Product";
import { ProductStorage } from "../types/ProductStorage";

export const ProductAPI = { getProduct, getProductsList };

function getProduct(id: number) {
    return axios
        .get(BACKEND_API_URL + `/products/${id}/`)
        .then((res: AxiosResponse<ProductAPIGetProductData>) => res)
        .catch((err: AxiosError<ProductAPIGetProductData>) => err.response as AxiosResponse);
}

function getProductsList(params?: ProductAPIGetProductsListParams) {
    return axios
        .get(BACKEND_API_URL + "/products/", { params })
        .then((res: AxiosResponse<ProductAPIGetProductsListData>) => res)
        .catch((err: AxiosError<ProductAPIGetProductsListData>) => err.response as AxiosResponse);
}

export type ProductAPIGetProductsListParams = {
    name?: string;
    min_price?: string;
    max_price?: string;
    types?: string;
    providers?: string;
};
export type ProductAPIGetProductData = Product & { storage_counts: Array<{ storage: ProductStorage; count: number }> };
export type ProductAPIGetProductsListData = {
    products: Array<Product>;
    price_range: {
        max: number;
        min: number;
    };
};
