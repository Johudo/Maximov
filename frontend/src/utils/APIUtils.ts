import Cookies from "js-cookie";
import { JWT_AUTH_HEADER_PREFIX } from "../../config";

export const APIUtils = {
    setDefaultHeader,
};

function setDefaultHeader() {
    const accessCookie = Cookies.get("access") || "";

    const headers: any = {};
    if (accessCookie) headers["Authorization"] = `${JWT_AUTH_HEADER_PREFIX} ${accessCookie}`;

    return headers;
}
