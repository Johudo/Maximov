import { NextApiRequest } from "next";
import { IncomingMessage } from "http";
import { JWT_AUTH_HEADER_PREFIX } from "../../config";
import Cookies from "js-cookie";
import cookie from "cookie";

export const APIUtils = {
    setDefaultHeader,
};

function setDefaultHeader(req?: NextApiRequest | IncomingMessage): HeaderType {
    const accessCookie = cookie.parse(req?.headers?.cookie || "").access || Cookies.get("access") || "";

    const headers: HeaderType = {};
    if (accessCookie) headers["Authorization"] = `${JWT_AUTH_HEADER_PREFIX} ${accessCookie}`;

    return headers;
}

export type HeaderType = { [header: string]: string };
