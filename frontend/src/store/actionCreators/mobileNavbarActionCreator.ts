import { MobileNavbarActionsEnum } from "../actions/mobileNavbarActions";

export const MobileNavbarActionCreator = {
    toggleMobileNavbar,
    closeMobileNavbar,
};

function toggleMobileNavbar() {
    return {
        type: MobileNavbarActionsEnum.TOGGLE_MOBILE_NAVBAR,
    };
}

function closeMobileNavbar() {
    return {
        type: MobileNavbarActionsEnum.CLOSE_MOBILE_NAVBAR,
    };
}
