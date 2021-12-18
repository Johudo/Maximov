import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import styles from "./ProfileOrder.module.scss";
import { Order } from "../../types/Order";
import ProfileProductCard from "../ProfileProductCard";
import { Product } from "../../types/Product";

export default function ProfileOrder(props: ProfileOrderProps) {
    function getOrderTotalPrice() {
        return props.order.order_products.reduce(
            (totalPrice, product) => totalPrice + product.count * Number(product.product.price),
            0
        );
    }

    function prettyDatetime() {
        const date = new Date(Date.parse(props.order.datetime));
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    }

    return (
        <div className={styles.order}>
            <div className={styles.orderHeader}>
                <div>
                    <span className={styles.greenText}>{"Заказ №" + props.order.id}</span>
                    {" от " + prettyDatetime()}
                </div>
                <div className={styles.greenText}>{getOrderTotalPrice() + " ₽"}</div>
            </div>

            <div className={styles.orderInfo}>
                <div className={styles.ordersList}>
                    {props.order.order_products.map((order_products, index) => (
                        <ProfileProductCard
                            product={order_products.product}
                            count={order_products.count}
                            key={`Profile_orders_${props.order.id}_${index}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

type ProfileOrderProps = { order: Order<Product<unknown, unknown, unknown>> };
