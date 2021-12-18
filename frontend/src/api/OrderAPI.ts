import axios, { AxiosError, AxiosResponse } from "axios";
import { NextApiRequest } from "next";
import { IncomingMessage } from "http";
import { BACKEND_API_URL } from "../../config";
import { PaymentTypeEnum } from "../enums/PaymentTypeEnum";
import { Order } from "../types/Order";
import { Product } from "../types/Product";
import { APIUtils } from "../utils/APIUtils";

export const OrderAPI = { createOrder, getOwnOrders };

function createOrder(data: {
    payment_type: PaymentTypeEnum;
    storage: number;
    order_products: Array<{ product: number; count: number }>;
}) {
    const defaultHeaders: any = APIUtils.setDefaultHeader();

    return axios
        .post(BACKEND_API_URL + "/api/orders/", data, { headers: defaultHeaders })
        .then((res: AxiosResponse<OrderAPICreateOrderData>) => res)
        .catch((err: AxiosError<OrderAPICreateOrderData>) => err.response as AxiosResponse);
}

function getOwnOrders(req?: NextApiRequest | IncomingMessage) {
    const defaultHeaders: any = APIUtils.setDefaultHeader(req);

    return axios
        .get(BACKEND_API_URL + "/api/orders/", { headers: defaultHeaders })
        .then((res: AxiosResponse<OrderAPIGetOwnOrdersData>) => res)
        .catch((err: AxiosError<OrderAPIGetOwnOrdersData>) => err.response as AxiosResponse);
}

export type OrderAPICreateOrderData = Order<number>;
export type OrderAPIGetOwnOrdersData = Array<Order<Product<number, number, undefined>>>;
