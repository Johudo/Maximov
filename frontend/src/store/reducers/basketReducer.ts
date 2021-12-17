import { AnyAction } from "redux";
import { BasketItem } from "../../types/BasketItem";
import { BasketStorage } from "../../utils/BasketStorage";
import { BasketActionsEnum } from "../actions/basketActions";
import { BasketState, defaultBasketState } from "../states/BasketState";

export default function basketReducer(state: BasketState = defaultBasketState, action: AnyAction): BasketState {
    const changeProductCount = (basketItem: BasketItem, newCount: number) => {
        if (isNaN(Number(newCount))) return state.products;

        if (newCount <= 0)
            return state.products.filter((item: BasketItem) => item.product.id !== basketItem.product.id);

        return state.products.map((item: BasketItem) =>
            item.product.id !== basketItem.product.id ? item : { ...item, count: Number(newCount) }
        );
    };

    let products = state.products;

    switch (action.type) {
        case BasketActionsEnum.TOGGLE_BASKET:
            return { ...state, isOpen: !state.isOpen };

        case BasketActionsEnum.CLOSE_BASKET:
            return { ...state, isOpen: false };

        case BasketActionsEnum.CHANGE_PRODUCT_COUNT:
            products = changeProductCount(action.basketItem, action.newCount);

            BasketStorage.setBasketStorage(products);
            return { ...state, products };

        case BasketActionsEnum.ADD_PRODUCT:
            const foundProduct = state.products.find(
                (basketItem: BasketItem) => basketItem.product.id === action.basketItem.product.id
            );

            if (foundProduct) products = changeProductCount(action.basketItem, foundProduct.count + 1);
            else products = [...state.products, action.basketItem];

            BasketStorage.setBasketStorage(products);
            return { ...state, products };

        case BasketActionsEnum.CLEAR_BASKET:
            BasketStorage.setBasketStorage([]);
            return { ...state, products: [] };

        default:
            return state;
    }
}
