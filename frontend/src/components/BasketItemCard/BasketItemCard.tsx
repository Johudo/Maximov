import React from "react";
import { BasketItem } from "../../types/BasketItem";
import ProductCounter from "../ProductCounter";
import styles from "./BasketItemCard.module.scss";

export default function BasketItemCard(props: BasketItemCardProps) {
    return (
        <div className={styles.product}>
            <div className={styles.imageBlock}>
                <div className={styles.imageWrapper}>
                    <img
                        src={String(props.basketItem.product.image)}
                        alt={props.basketItem.product.name}
                        className={styles.image}
                    />
                </div>
            </div>

            <div className={styles.rightBlock}>
                <div className={styles.infoBlock}>
                    <div className={styles.nameInfo}>
                        {props.basketItem.product.name.length > 60
                            ? props.basketItem.product.name.slice(0, 59) + "..."
                            : props.basketItem.product.name}
                    </div>
                    <div className={styles.priceInfo}>
                        {(Number(props.basketItem.product.price) * props.basketItem.count).toFixed(2) + " ₽"}
                    </div>
                </div>

                <ProductCounter defaultValue={props.basketItem.count} product={props.basketItem} />
            </div>
        </div>
    );
}

type BasketItemCardProps = {
    basketItem: BasketItem;
};
