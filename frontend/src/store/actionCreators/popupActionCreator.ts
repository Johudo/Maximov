import { PopupTypeEnum } from "../../popups/Popup/PopupTypeEnum";
import { PopupActionsEnum } from "../actions/popupActions";

export const PopupActionCreator = {
    openPopup: openPopupActionCreate,
    closePopup: closePopupActionCreate,
};

function openPopupActionCreate(name: PopupTypeEnum) {
    return {
        type: PopupActionsEnum.OPEN_POPUP,
        payload: { name: name },
    };
}

function closePopupActionCreate() {
    return {
        type: PopupActionsEnum.CLOSE_POPUP,
        payload: {},
    };
}
