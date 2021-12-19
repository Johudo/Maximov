import axios, { AxiosError, AxiosResponse } from "axios";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { BACKEND_API_URL } from "../../../../../config";
import { HeaderType } from "../../../../types/HeaderType";
import { NextAPIUtils } from "../../../../utils/NextAPIUtils";

export default async function logoutAPIPage(req: NextApiRequest, res: NextApiResponse) {
    const allowedRequestMethods: Array<string> = ["GET"];

    if (!NextAPIUtils.isRequestMethodAllowed(req, res, allowedRequestMethods)) {
        return NextAPIUtils.setRequestMethodNotAllowed(req, res, allowedRequestMethods);
    }

    const cookies = cookie.parse(req.headers.cookie ?? "");
    const refresh = cookies.refresh || "";

    if (!refresh) {
        return res.status(401).json({
            error: "User unauthorized to make this request",
        });
    }

    try {
        const defaultHeaders: HeaderType = NextAPIUtils.setDefaultHeader(req);

        const apiRes = await axios
            .post(BACKEND_API_URL + "/api/logout/", { refresh }, { headers: defaultHeaders })
            .then((res: AxiosResponse<undefined>) => res)
            .catch((err: AxiosError) => err.response as AxiosResponse);

        if (apiRes.status === 200) {
            res.setHeader("Set-Cookie", "");
            return res.status(200).json({});
        }

        return res.status(apiRes.status).json(apiRes.data);
    } catch (error) {
        console.log(error);
        return NextAPIUtils.setIternalServerError(req, res);
    }
}
