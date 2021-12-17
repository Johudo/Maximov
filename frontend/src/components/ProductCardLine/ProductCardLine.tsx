import React from "react";
import styles from "./ProductCardLine.module.scss";
import { useDispatch } from "react-redux";
import { BasketActionCreator } from "../../store/actionCreators/basketActionCreator";
import { Product } from "../../types/Product";
import Button from "../Button";

export default function ProductCardLine(props: ProductCardLineProps) {
    const dispatch = useDispatch();

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={props.product.image} className={styles.image} alt={props.product.title} />
            </div>

            <div className={styles.infoBlock}>
                <div className={styles.rightBlock}>
                    <a href="/product" className={styles.catalogLink}>
                        <h2 className={styles.cardTitle}>{props.product.name}</h2>
                    </a>

                    <p className={styles.customInfo}>
                        <span>Процессор</span> AMD Ryzen 3 3200G - 4 cores - 4 threads - 3,6 Ghz (4,0 Ghz turbo boost)
                    </p>
                    <p className={styles.customInfo}>
                        <span>Видеокарта</span> Onboard AMD Radeon Vega 8
                    </p>
                    <p className={styles.customInfo}>
                        <span>RAM</span> 8GB DDR4-2666 Mhz (1 x 8GB)
                    </p>
                </div>

                <div className={styles.leftBlock}>
                    <p className={styles.cardPrice}>€ {props.product.price}</p>

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
