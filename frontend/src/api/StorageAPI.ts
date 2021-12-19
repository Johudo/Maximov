import axios, { AxiosError, AxiosResponse } from "axios";
import { NextApiRequest } from "next";
import { IncomingMessage } from "http";
import { BACKEND_API_URL } from "../../config";
import { NextAPIUtils } from "../utils/NextAPIUtils";
import { ProductStorage } from "../types/ProductStorage";
import { HeaderType } from "../types/HeaderType";

export const StorageAPI = { getStorages };

function getStorages(req?: NextApiRequest | IncomingMessage) {
    const defaultHeaders: HeaderType = NextAPIUtils.setDefaultHeader(req);

    return axios
        .get(BACKEND_API_URL + "/api/storages/", { headers: defaultHeaders })
        .then((res: AxiosResponse<StorageAPIGetOwnOrdersData>) => res)
        .catch((err: AxiosError<StorageAPIGetOwnOrdersData>) => err.response as AxiosResponse);
}

export type StorageAPIGetOwnOrdersData = Array<ProductStorage>;
