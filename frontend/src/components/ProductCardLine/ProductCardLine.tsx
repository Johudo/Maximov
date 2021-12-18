import React from "react";
import styles from "./ProductCardLine.module.scss";
import { useDispatch } from "react-redux";
import { BasketActionCreator } from "../../store/actionCreators/basketActionCreator";
import { Product } from "../../types/Product";
import Button from "../Button";

export default function ProductCardLine(props: ProductCardLineProps) {
    const dispatch = useDispatch();

    console.log(props);

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={props.product.image} className={styles.image} alt={props.product.name} />
            </div>

            <div className={styles.infoBlock}>
                <div className={styles.rightBlock}>
                    <a href={`/product/${props.product.id}/`} className={styles.catalogLink}>
                        <h2 className={styles.cardTitle}>{props.product.name}</h2>
                    </a>

                    {props.product.characteristics.map((characteristic, index) => (
                        <p className={styles.customInfo} key={`Product#${props.product.id} Characteristic#${index}`}>
                            <span>{characteristic.name}:</span> {characteristic.value}
                        </p>
                    ))}
                </div>

                <div className={styles.leftBlock}>
                    <p className={styles.cardPrice}>{props.product.price} ₽</p>

                    <div className={styles.buttonsBlock}>
                        <Button
                            type="button"
                            className={styles.basketButton}
                            onClick={() => {
                                dispatch(
                                    BasketActionCreator.addProductBasket({
                                        product: props.product,
                                        count: 1,
                                    })
                                );
                            }}
                        >
                            В корзину
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

type ProductCardLineProps = {
    product: Product;
};
