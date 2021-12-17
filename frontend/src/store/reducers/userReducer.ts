import { AnyAction } from "redux";
import { UserActionsEnum } from "../actions/userActions";
import { defaultUserState, UserState } from "../states/UserState";

export default function userReducer(state: UserState = defaultUserState, action: AnyAction) {
    switch (action.type) {
        case UserActionsEnum.REGISTER_SUCCESS:
            return {
                ...state,
                register_success: true,
            };

        case UserActionsEnum.REGISTER_FAIL:
            return {
                ...state,
            };

        case UserActionsEnum.RESET_REGISTER_SUCCESS:
            return {
                ...state,
                register_success: false,
            };

        case UserActionsEnum.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            };

        case UserActionsEnum.LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
            };

        case UserActionsEnum.LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                userInfo: null,
            };

        case UserActionsEnum.LOGOUT_FAIL:
            return {
                ...state,
            };

        case UserActionsEnum.LOAD_USER_SUCCESS:
            return {
                ...state,
                userInfo: action.payload.user || {},
                isAuthenticated: action.payload.isAuthenticated || false,
            };

        case UserActionsEnum.LOAD_USER_FAIL:
            return {
                ...state,
                userInfo: null,
            };

        case UserActionsEnum.AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            };

        case UserActionsEnum.AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                userInfo: null,
            };

        case UserActionsEnum.REFRESH_SUCCESS:
            return {
                ...state,
            };

        case UserActionsEnum.REFRESH_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                userInfo: null,
            };

        case UserActionsEnum.SET_AUTH_LOADING:
            return {
                ...state,
                loading: true,
            };

        case UserActionsEnum.REMOVE_AUTH_LOADING:
            return {
                ...state,
                loading: false,
            };

        default:
            return state;
    }
}
