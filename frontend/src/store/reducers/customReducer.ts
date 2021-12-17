import { AnyAction } from "redux";
import { Product } from "../../types/Product";
import { CustomActionsEnum } from "../actions/customActions";
import { CustomState, defaultCustomState } from "../states/CustomState";

export default function customReducer(state: CustomState = defaultCustomState, action: AnyAction): CustomState {
    switch (action.type) {
        case CustomActionsEnum.SET_CUSTOM:
            return { products: action.products };

        case CustomActionsEnum.CHANGE_CUSTOM:
            let productList: Array<Product> = [...state.products];
            productList[productList.findIndex((product) => product.types === (action.product as Product).types)] =
                action.product;
            return { products: productList };

        default:
            return state;
    }
}
