import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import styles from "./ProductCard.module.scss";
import { ProductCardProps } from "./ProductCardProps";
import { BasketActionCreator } from "../../store/actionCreators/basketActionCreator";

export default function ProductCard(props: ProductCardProps) {
    const dispatch = useDispatch();

    return (
        <div className={styles.card}>
            <a href={"/product/" + props.product.id + "/"} className={styles.catalogLink}>
                <div className={styles.imageWrapper}>
                    <img src={props.product.image} className={styles.image} alt={props.product.name} />
                </div>
                <h2 className={styles.cardTitle}>{props.product.name}</h2>
            </a>

            <div className={styles.lowerBlock}>
                <div className={styles.buttonsBlock}>
                    <button
                        className={styles.button}
                        onClick={() => {
                            dispatch(
                                BasketActionCreator.addProductBasket({
                                    product: props.product,
                                    count: 1,
                                })
                            );
                        }}
                    >
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </button>
                </div>

                <p className={styles.cardPrice}>{props.product.price} ₽</p>
            </div>
        </div>
    );
}
