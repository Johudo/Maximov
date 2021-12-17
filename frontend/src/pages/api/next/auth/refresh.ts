import axios, { AxiosError, AxiosResponse } from "axios";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { BACKEND_API_URL } from "../../../../../config";
import { AuthLoginAPIData } from "../../../../api/AuthAPI";
import { NextAPIUtils } from "../../../../utils/NextAPIUtils";

export default async function refreshNextAPI(req: NextApiRequest, res: NextApiResponse) {
    const allowedRequestMethods: Array<string> = ["GET"];

    if (!NextAPIUtils.isRequestMethodAllowed(req, res, allowedRequestMethods)) {
        return NextAPIUtils.setRequestMethodNotAllowed(req, res, allowedRequestMethods);
    }

    const refresh = cookie.parse(req.headers.cookie ?? "").refresh || "";

    if (!refresh) {
        return res.status(401).json({
            error: "User unauthorized to make this request",
        });
    }

    try {
        const defaultHeaders: any = NextAPIUtils.setDefaultHeader(req);

        const apiRes = await axios
            .post(BACKEND_API_URL + "/token/refresh/", { refresh }, { headers: defaultHeaders })
            .then((res: AxiosResponse<{}>) => res)
            .catch((err: AxiosError) => err.response as AxiosResponse);

        if (apiRes.status === 200)
            res.setHeader("Set-Cookie", [NextAPIUtils.serializeAccessCookie((apiRes.data as AuthLoginAPIData).access)]);

        if (apiRes.status === 401) res.setHeader("Set-Cookie", "");

        return res.status(apiRes.status).json(apiRes.data);
    } catch (error) {
        console.log(error);
        return NextAPIUtils.setIternalServerError(req, res);
    }
}
