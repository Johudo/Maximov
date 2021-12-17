import axios, { AxiosError, AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { BACKEND_API_URL } from "../../../../../config";
import { AuthLoginAPIData } from "../../../../api/AuthAPI";
import { NextAPIUtils } from "../../../../utils/NextAPIUtils";

export default async function loginNextAPI(req: NextApiRequest, res: NextApiResponse) {
    const allowedRequestMethods: Array<string> = ["POST"];

    if (!NextAPIUtils.isRequestMethodAllowed(req, res, allowedRequestMethods)) {
        return NextAPIUtils.setRequestMethodNotAllowed(req, res, allowedRequestMethods);
    }

    try {
        const defaultHeaders: any = NextAPIUtils.setDefaultHeader(req);

        const apiRes = await axios
            .post(BACKEND_API_URL + "/login/", req.body, { headers: defaultHeaders })
            .then((res: AxiosResponse<AuthLoginAPIData>) => res)
            .catch((err: AxiosError) => err.response as AxiosResponse);

        if (apiRes.status === 200) {
            res.setHeader("Set-Cookie", [
                NextAPIUtils.serializeAccessCookie((apiRes.data as AuthLoginAPIData).access),
                NextAPIUtils.serializeRefreshCookie((apiRes.data as AuthLoginAPIData).refresh),
            ]);

            return res.status(200).json({});
        }

        if (apiRes.status === 401) {
            res.setHeader("Set-Cookie", "");
            return res.status(401).json(apiRes.data);
        }

        return res.status(apiRes.status).json(apiRes.data);
    } catch (error) {
        console.log(error);
        return NextAPIUtils.setIternalServerError(req, res);
    }
}
