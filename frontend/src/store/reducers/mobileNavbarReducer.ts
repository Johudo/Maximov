import { AnyAction } from "redux";
import { MobileNavbarActionsEnum } from "../actions/mobileNavbarActions";
import { defaultMobileNavbarState, MobileNavbarState } from "../states/MobileNavbarState";

export default function mobileNavbarReducer(
    state: MobileNavbarState = defaultMobileNavbarState,
    action: AnyAction
): MobileNavbarState {
    switch (action.type) {
        case MobileNavbarActionsEnum.CLOSE_MOBILE_NAVBAR:
            return { ...state, isOpen: false };

        case MobileNavbarActionsEnum.TOGGLE_MOBILE_NAVBAR:
            return { ...state, isOpen: !state.isOpen };

        default:
            return state;
    }
}
