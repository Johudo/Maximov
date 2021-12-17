import React, { useEffect, useState } from "react";
import styles from "./Basket.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store";
import { BasketActionCreator } from "../../store/actionCreators/basketActionCreator";
import Button from "../Button";
import BasketItemCard from "../BasketItemCard";

export default function Basket() {
    const basketState = useSelector((state: IState) => state.basket.products);

    const dispatch = useDispatch();

    function closeBasketCallback() {
        dispatch(BasketActionCreator.toggleBasket());
    }

    return (
        <div className={styles.basket} onClick={(event) => event.stopPropagation()}>
            <h3 className={styles.title}>Корзина</h3>

            <div className={styles.productsList}>
                {basketState.map((item, index) => {
                    return <BasketItemCard basketItem={item} key={"basket-item-" + index} />;
                })}
            </div>

            <div className={styles.totalBlock}>
                <div className={styles.totalTitle}>Итого: </div>
                <div className={styles.totalPrice}>
                    €{" "}
                    {basketState
                        .reduce((sum, current) => sum + current.count * Number(current.product.price), 0)
                        .toFixed(2)}
                </div>
            </div>

            {basketState.length > 0 && (
                <div className={styles.buttonsBlock}>
                    <Button
                        className={styles.toCheckoutButton}
                        onClick={() => {
                            closeBasketCallback();
                            location.assign("/ordering");
                        }}
                    >
                        Оформить заказ
                    </Button>
                </div>
            )}
        </div>
    );
}
