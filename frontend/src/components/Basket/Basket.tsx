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
import { PopupActionCreator } from "../../store/actionCreators/popupActionCreator";
import { PopupTypeEnum } from "../../popups/Popup/PopupTypeEnum";
import FormErrorsBlock from "../FormErrorsBlock";
import { ProductStorage } from "../../types/ProductStorage";
import { StorageAPI } from "../../api/StorageAPI";

export default function Basket() {
    const [storages, setStorages] = useState<Array<ProductStorage>>([]);

    const isAuthenticated = useSelector((state: IState) => state.user.isAuthenticated);
    const basketState = useSelector((state: IState) => state.basket.products);

    const dispatch = useDispatch();
    const { register, handleSubmit, formState } = useForm();

    async function getStorages() {
        const result = await StorageAPI.getStorages();

        if (result.status === 200) {
            setStorages(result.data);
            return;
        }

        alert("Ошибка загрузки складов");
        console.log(result);
    }

    useEffect(() => {
        getStorages();
    }, []);

    async function onSubmit(data: { payment: PaymentTypeEnum; storage: number }) {
        if (!isAuthenticated) {
            dispatch(PopupActionCreator.openPopup(PopupTypeEnum.login));
            return;
        }

        const newData = {
            payment_type: data.payment,
            storage: data.storage,
            order_products: basketState.map((basketItem) => {
                return { product: basketItem.product.id, count: basketItem.count };
            }),
        };

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
            <div className={[styles.basketBlock, styles.productsList].join(" ")}>
                <h3 className={styles.title}>Корзина</h3>

                {basketState.map((item, index) => {
                    return <BasketItemCard basketItem={item} key={"basket-item-" + index} />;
                })}
            </div>

            <div className={[styles.basketBlock, styles.totalBlock].join(" ")}>
                <div className={styles.totalTitle}>Итого: </div>
                <div className={styles.totalPrice}>
                    {basketState
                        .reduce((sum, current) => sum + current.count * Number(current.product.price), 0)
                        .toFixed(2)}{" "}
                    ₽
                </div>
            </div>

            <div className={styles.basketBlock}>
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

                <div className={styles.formBlock}>
                    <h4 className={styles.formTitle}>Склады</h4>

                    {storages.map((storage) => (
                        <RadioInput
                            key={`storage_radio__${storage.id}`}
                            id={"storage_radio_" + storage.id}
                            value={storage.id}
                            label={storage.address}
                            {...register("storage", {
                                required: "Склад - обязательное поле",
                            })}
                        />
                    ))}
                </div>

                <FormErrorsBlock errors={formState.errors} className={styles.formErrors} />

                {basketState.length > 0 && (
                    <div className={styles.buttonsBlock}>
                        <Button className={styles.toCheckoutButton}>Оформить заказ</Button>
                    </div>
                )}
            </div>
        </form>
    );
}
