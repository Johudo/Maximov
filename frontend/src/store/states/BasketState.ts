import { BasketItem } from "../../types/BasketItem";

export type BasketState = {
    isOpen: boolean;
    products: Array<BasketItem>;
};

export const defaultBasketState: BasketState = {
    isOpen: false,
    products: [],
};
