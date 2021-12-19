import { BasketItem } from "../../types/BasketItem";
import { BasketActionsEnum } from "../actions/basketActions";

export const BasketActionCreator = {
    toggleBasket: toggleBasketState,
    closeBasket: closeBasketState,
    changeProductCountBasket: changeProductCountBasketState,
    addProductBasket: addProductBasketState,
    clearBasket,
    openBasket,
};

function toggleBasketState() {
    return {
        type: BasketActionsEnum.TOGGLE_BASKET,
    };
}

function openBasket() {
    return {
        type: BasketActionsEnum.OPEN_BASKET,
    };
}

function closeBasketState() {
    return {
        type: BasketActionsEnum.CLOSE_BASKET,
    };
}

function changeProductCountBasketState(basketItem: BasketItem, newCount: number) {
    return {
        type: BasketActionsEnum.CHANGE_PRODUCT_COUNT,
        basketItem,
        newCount,
    };
}

function addProductBasketState(basketItem: BasketItem) {
    return {
        type: BasketActionsEnum.ADD_PRODUCT,
        basketItem: basketItem,
    };
}

function clearBasket() {
    return {
        type: BasketActionsEnum.CLEAR_BASKET,
    };
}
