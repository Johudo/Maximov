import { Product } from "../../types/Product";
import { CustomActionsEnum } from "../actions/customActions";

export const CustomActionCreator = {
    setCustomState,
    changeCustomState,
};

export function setCustomState(products: Product[]) {
    return {
        type: CustomActionsEnum.SET_CUSTOM,
        products,
    };
}

export function changeCustomState(product: Product) {
    return {
        type: CustomActionsEnum.CHANGE_CUSTOM,
        product,
    };
}
