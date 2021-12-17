import { AnyAction } from "redux";
import { PopupActionsEnum } from "../actions/popupActions";
import { defaultPopupState, PopupState } from "../states/PopupState";

export default function popupReducer(state: PopupState = defaultPopupState, action: AnyAction): PopupState {
    switch (action.type) {
        case PopupActionsEnum.OPEN_POPUP:
            return { ...state, isOpen: true, name: action.payload.name };

        case PopupActionsEnum.CLOSE_POPUP:
            return { ...state, isOpen: false, name: null };

        default:
            return state;
    }
}
