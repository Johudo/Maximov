import Cookies from "js-cookie";
import { BasketItem } from "../types/BasketItem";

export const BasketStorage = { setBasketStorage };

function setBasketStorage(basketState: Array<BasketItem>) {
    Cookies.set("basket", JSON.stringify(basketState));
}
