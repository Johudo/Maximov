import React from "react";
import styles from "./ProfileProductCard.module.scss";
import ProfileProductCardProps from "./ProfileProductCardProps";

export default function ProfileProductCard(props: ProfileProductCardProps) {
    return (
        <a href={`/product/${props.product.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={props.product.image} className={styles.image} alt={props.product.name} />
            </div>

            <div className={styles.rightBlock}>
                <h4 className={styles.cardTitle}>{props.product.name}</h4>
                <p className={styles.cardPrice}>
                    {props.product.price} ₽ x {props.count}
                </p>
            </div>
        </a>
    );
}
