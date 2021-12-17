import { PopupTypeEnum } from "../../popups/Popup/PopupTypeEnum";

export type PopupState = {
    isOpen: boolean;
    name: PopupTypeEnum | null;
};

export const defaultPopupState: PopupState = {
    isOpen: false,
    name: null,
};
