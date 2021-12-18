import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
import cookie from "cookie";
import { JWT_AUTH_HEADER_PREFIX } from "../../config";
import { IncomingMessage } from "http";
import Cookies from "js-cookie";
import { HeaderType } from "../types/HeaderType";

export const NextAPIUtils = {
    isRequestMethodAllowed,
    setRequestMethodNotAllowed,
    setIternalServerError,
    serializeAccessCookie,
    serializeRefreshCookie,
    setDefaultHeader,
    removeCookie,
};

function isRequestMethodAllowed(
    req: NextApiRequest,
    res: NextApiResponse,
    allowedRequestMethods: Array<string>
): boolean {
    for (const index in allowedRequestMethods) {
        if (req.method === allowedRequestMethods[index]) return true;
    }

    return false;
}

function setRequestMethodNotAllowed(req: NextApiRequest, res: NextApiResponse, allowedRequestMethods: Array<string>) {
    res.setHeader("Allow", allowedRequestMethods);
    res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
        error: `Method ${req.method} not allowed`,
    });
}

function setIternalServerError(req: NextApiRequest, res: NextApiResponse) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Something went wrong when retrieving user",
    });
}

function serializeAccessCookie(access: string): string {
    return cookie.serialize("access", access, {
        maxAge: 60 * 30,
        path: "/",
    });
}

function serializeRefreshCookie(refresh: string): string {
    return cookie.serialize("refresh", refresh, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
    });
}

function setDefaultHeader(req?: NextApiRequest | IncomingMessage): HeaderType {
    const accessCookie = cookie.parse(req?.headers?.cookie || "").access || Cookies.get("access") || "";

    const headers: HeaderType = {};
    if (accessCookie) headers["Authorization"] = `${JWT_AUTH_HEADER_PREFIX} ${accessCookie}`;

    return headers;
}

function removeCookie(res: NextApiResponse, cookies: Array<string>) {
    res.setHeader(
        "Set-Cookie",
        cookies.map((name) =>
            cookie.serialize(name, "", {
                maxAge: -1,
                path: "/",
            })
        )
    );
}
