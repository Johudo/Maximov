import axios, { AxiosError, AxiosResponse } from "axios";
import { NextPageContext } from "next";
import { BACKEND_API_URL, JWT_AUTH_HEADER_PREFIX } from "../../config";
import cookie from "cookie";
import { AnyAction, Store } from "redux";
import { IState } from "../store";
import { ThunkDispatch } from "redux-thunk";
import { UserActionsEnum } from "../store/actions/userActions";
import { NextAPIUtils } from "./NextAPIUtils";
import { UserInfoAPIData } from "../api/UserAPI";

export const AuthStartUp = async (store: Store<IState, AnyAction>, { pathname, req, res }: NextPageContext) => {
    try {
        const refresh = cookie.parse(req?.headers.cookie || "").refresh || "";

        if (!refresh) {
            throw Error;
        }

        const apiResRefresh = await axios
            .post(BACKEND_API_URL + "/token/refresh/", { refresh })
            .then((res: AxiosResponse<{}>) => res)
            .catch((err: AxiosError) => err.response as AxiosResponse);

        if (apiResRefresh.status !== 200) {
            if (apiResRefresh.status === 401) res?.setHeader("Set-Cookie", "");
            throw Error;
        }

        res?.setHeader("Set-Cookie", [NextAPIUtils.serializeAccessCookie(apiResRefresh.data.access)]);

        const apiResUserInfo = await axios
            .get(BACKEND_API_URL + "/api/users/me/", {
                headers: { Authorization: `${JWT_AUTH_HEADER_PREFIX} ${apiResRefresh.data.access}` },
            })
            .then((res: AxiosResponse<UserInfoAPIData>) => res)
            .catch((err: AxiosError) => err.response as AxiosResponse);

        if (apiResUserInfo.status !== 200) {
            throw Error;
        }

        (store.dispatch as ThunkDispatch<IState, {}, any>)({
            type: UserActionsEnum.LOAD_USER_SUCCESS,
            payload: {
                user: apiResUserInfo.data,
                isAuthenticated: true,
            },
        });
    } catch (err) {}
};
