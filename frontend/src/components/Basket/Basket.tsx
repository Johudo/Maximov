import React, { useEffect, useState } from "react";
import styles from "./Basket.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store";
import { BasketActionCreator } from "../../store/actionCreators/basketActionCreator";
import Button from "../Button";
import BasketItemCard from "../BasketItemCard";
import { PaymentTypeEnum, PaymentTypeEnumArray } from "../../enums/PaymentTypeEnum";
import RadioInput from "../RadioInput";
import { useForm } from "react-hook-form";
import { OrderAPI } from "../../api/OrderAPI";

export default function Basket() {
    const basketState = useSelector((state: IState) => state.basket.products);

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function onSubmit(data: { payment: PaymentTypeEnum }) {
        const newData = {
            payment_type: data.payment,
            storage: 1,
            order_products: basketState.map((basketItem) => {
                return { product: basketItem.product.id, count: basketItem.count };
            }),
        };

        console.log(newData);
        console.log(JSON.stringify(newData));

        const result = await OrderAPI.createOrder(newData);

        if (result.status !== 201) {
            console.log(result);
            alert("Ошибка");
            return;
        }

        dispatch(BasketActionCreator.clearBasket());
        location.assign("/profile");
    }

    return (
        <form className={styles.basket} onClick={(event) => event.stopPropagation()} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={styles.title}>Корзина</h3>

            <div className={styles.productsList}>
                {basketState.map((item, index) => {
                    return <BasketItemCard basketItem={item} key={"basket-item-" + index} />;
                })}
            </div>

            <div className={styles.totalBlock}>
                <div className={styles.totalTitle}>Итого: </div>
                <div className={styles.totalPrice}>
                    {basketState
                        .reduce((sum, current) => sum + current.count * Number(current.product.price), 0)
                        .toFixed(2)}{" "}
                    ₽
                </div>
            </div>

            <div className={styles.formBlock}>
                <h4 className={styles.formTitle}>Оплата</h4>

                {PaymentTypeEnumArray.map((type) => (
                    <RadioInput
                        key={`PaymentTypeRadio__${type.type}`}
                        id={type.type}
                        value={type.type}
                        label={type.text}
                        {...register("payment", {
                            required: "Оплата - обязательное поле",
                        })}
                    />
                ))}
            </div>

            {basketState.length > 0 && (
                <div className={styles.buttonsBlock}>
                    <Button className={styles.toCheckoutButton}>Оформить заказ</Button>
                </div>
            )}
        </form>
    );
}
