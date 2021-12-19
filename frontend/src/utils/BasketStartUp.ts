import { NextPageContext } from "next";
import cookie from "cookie";
import { AnyAction, Store } from "redux";
import { IState } from "../store";
import { BasketItem } from "../types/BasketItem";
import { BasketActionCreator } from "../store/actionCreators/basketActionCreator";
import { ProductAPI } from "../api/ProductAPI";

export const BasketStartUp = async (store: Store<IState, AnyAction>, { req }: NextPageContext) => {
    const basket = JSON.parse(cookie.parse(req?.headers.cookie || "").basket || "{}");

    const newBasket: Array<BasketItem> = [];

    if (Array.isArray(basket))
        for (const index in basket) {
            const basketItem = basket[index];

            if (!(!Number.isNaN(Number(basketItem?.product?.id)) && !Number.isNaN(Number(basketItem?.count)))) continue;

            try {
                const productResult = await ProductAPI.getProduct(basketItem?.product?.id);
                if (productResult.status === 200)
                    newBasket.push({ product: productResult.data, count: basketItem.count });
            } catch (err) {
                console.log(err);
            }
        }

    newBasket.forEach((basketItem) => store.dispatch(BasketActionCreator.addProductBasket(basketItem)));
};
