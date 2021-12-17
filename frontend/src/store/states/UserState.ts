import { User } from "../../types/User";

export type UserState = {
    userInfo: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    registerSuccess: boolean;
};

export const defaultUserState: UserState = {
    userInfo: null,
    isAuthenticated: false,
    loading: false,
    registerSuccess: false,
};
