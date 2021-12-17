import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";
import basketReducer from "./reducers/basketReducer";
import mobileNavbarReducer from "./reducers/mobileNavbarReducer";
import popupReducer from "./reducers/popupReducer";
import userReducer from "./reducers/userReducer";
import { BasketState, defaultBasketState } from "./states/BasketState";
import { defaultMobileNavbarState, MobileNavbarState } from "./states/MobileNavbarState";
import { defaultPopupState, PopupState } from "./states/PopupState";
import { defaultUserState, UserState } from "./states/UserState";

export interface IState {
    popup: PopupState;
    user: UserState;
    basket: BasketState;
    mobileNavbar: MobileNavbarState;
}

export const initialState: IState = {
    popup: defaultPopupState,
    user: defaultUserState,
    basket: defaultBasketState,
    mobileNavbar: defaultMobileNavbarState,
};

export const rootReducer = (state: IState | undefined, action: AnyAction) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };
        return nextState;
    } else {
        return combineReducers({
            popup: popupReducer,
            user: userReducer,
            basket: basketReducer,
            mobileNavbar: mobileNavbarReducer,
        })(state, action);
    }
};
