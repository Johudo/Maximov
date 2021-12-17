import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { OrderAPI } from "../../api/OrderAPI";
import { EMAIL_REGEXP_ERROR_MESSAGE, PHONE_REGEXP_ERROR_MESSAGE } from "../../constants/errorMessages";
import { EMAIL_REGEXP, PHONE_REGEXP } from "../../constants/regexps";
import { DeliveryEnum } from "../../enums/DeliveryEnum";
import { PaymentEnum } from "../../enums/PaymentEnum";
import { IState } from "../../store";
import { BasketActionCreator } from "../../store/actionCreators/basketActionCreator";
import BasketItemCard from "../BasketItemCard";
import Button from "../Button";
import FormError from "../FormError";
import Input from "../Input";
import RadioInput from "../RadioInput";
import styles from "./OrderingForm.module.scss";

function OrderingForm(props: OrderingFormProps, ref: React.ForwardedRef<any>) {
    const basketState = useSelector((state: IState) => state.basket.products);
    const userState = useSelector((state: IState) => state.user.userInfo);

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function onSubmit(data: OrderingFormData) {
        const result = await OrderAPI.createOrder(data);

        if (result.status !== 201) {
            console.log(result);
            return;
        }

        dispatch(BasketActionCreator.clearBasket());
        location.assign("/profile");
    }

    return (
        <form className={styles.page} onSubmit={handleSubmit(onSubmit)} ref={ref}>
            <div className={styles.dataCard}>
                <h3 className={styles.formTitle}>Оформление заказа</h3>

                <Input
                    type="text"
                    placeholder="Ваше имя"
                    defaultValue={(userState && userState.first_name + " " + userState.last_name) || ""}
                    error={errors.name}
                    {...register("name", {
                        required: "Ваше имя - обязательное поле",
                    })}
                />

                <Input
                    type="text"
                    placeholder="Номер телефона"
                    error={errors.phone}
                    {...register("phone", {
                        required: "Номер телефона - обязательное поле",
                        pattern: { value: PHONE_REGEXP, message: PHONE_REGEXP_ERROR_MESSAGE },
                    })}
                />

                <Input
                    type="text"
                    placeholder="Ваш e-mail"
                    defaultValue={(userState && userState.email) || ""}
                    error={errors.email}
                    {...register("email", {
                        required: "Ваше имя - обязательное поле",
                        pattern: { value: EMAIL_REGEXP, message: EMAIL_REGEXP_ERROR_MESSAGE },
                    })}
                />

                <Input
                    type="text"
                    placeholder="Индекс"
                    error={errors.index}
                    {...register("index", {
                        required: "Индекс - обязательное поле",
                    })}
                />

                <Input
                    type="text"
                    placeholder="Область"
                    error={errors.region}
                    {...register("region", {
                        required: "Область - обязательное поле",
                    })}
                />

                <Input
                    type="text"
                    placeholder="Город"
                    error={errors.city}
                    {...register("city", {
                        required: "Город - обязательное поле",
                    })}
                />

                <Input
                    type="text"
                    placeholder="Улица"
                    error={errors.street}
                    {...register("street", {
                        required: "Улица - обязательное поле",
                    })}
                />

                <Input
                    type="text"
                    placeholder="Дом"
                    error={errors.house}
                    {...register("house", {
                        required: "Дом - обязательное поле",
                    })}
                />

                <Input
                    type="text"
                    placeholder="Комментарии к заказу"
                    error={errors.comments}
                    {...register("comments")}
                />

                <FormError errors={errors} keyValue={"OrderingForm__error__"} />
            </div>

            <div className={styles.basketCard}>
                <div className={styles.productsList}>
                    {basketState.map((item, index) => {
                        return <BasketItemCard basketItem={item} key={"ordering-basket__item__" + index} />;
                    })}
                </div>

                <div className={styles.basketData}>
                    <div className={styles.formBlock}>
                        <h4 className={styles.formTitle}>Доставка</h4>

                        <RadioInput
                            id="delivery"
                            value={DeliveryEnum.PICKUP}
                            label={"Самовывоз"}
                            defaultChecked
                            {...register("delivery", {
                                required: "Доставка - обязательное поле",
                            })}
                        />
                        <RadioInput
                            id="pickup"
                            value={DeliveryEnum.DELIVERY}
                            label={"Доставка"}
                            {...register("delivery", {
                                required: "Доставка - обязательное поле",
                            })}
                        />
                    </div>

                    <div className={styles.formBlock}>
                        <h4 className={styles.formTitle}>Оплата</h4>

                        <RadioInput
                            id="cash"
                            value={PaymentEnum.CASH}
                            label={"Наличными курьеру"}
                            defaultChecked
                            {...register("payment", {
                                required: "Оплата - обязательное поле",
                            })}
                        />
                        <RadioInput
                            id="card"
                            value={PaymentEnum.CARD}
                            label={"Картой онлайн"}
                            {...register("payment", {
                                required: "Оплата - обязательное поле",
                            })}
                        />
                    </div>

                    <div className={styles.totalPrice}>
                        Итого:{" "}
                        <span>
                            {basketState
                                .reduce((sum, current) => sum + current.count * Number(current.product.price), 0)
                                .toFixed(2)}{" "}
                            €
                        </span>
                    </div>

                    <Button className={styles.button}>ОФОРМИТЬ ЗАКАЗ</Button>
                </div>
            </div>
        </form>
    );
}

type OrderingFormData = {
    name: string;
    phone: string;
    email: string;
    index: string;
    region: string;
    city: string;
    street: string;
    house: string;
    comments: string;
    delivery: string;
    payment: string;
};

type OrderingFormProps = {};

export default React.forwardRef(OrderingForm);
