import React, { useState } from "react";
import styles from "./ProductDetails.module.scss";
import { useDispatch } from "react-redux";
import fbImg from "../../../public/images/productDetails/fb.png";
import twImg from "../../../public/images/productDetails/tw.png";
import googImg from "../../../public/images/productDetails/goog.png";
import { BasketActionCreator } from "../../store/actionCreators/basketActionCreator";
import ProductCounter from "../ProductCounter";
import { Product } from "../../types/Product";
import Button from "../Button";

export default function ProductDetails(props: ProductDetailsProps) {
    const [productCount, setProductCount] = useState(1);

    const dispatch = useDispatch();

    return (
        <div className={styles.container}>
            <div className={styles.titleBlock}>
                <h2 className={styles.productName}>{props.product ? props.product.name : "undefined"}</h2>
                <p className={styles.productEnable}>В наличии</p>
            </div>

            <div className={styles.price}>
                Цена <span>{"€ " + (props.product ? props.product.price : 0)}</span>{" "}
            </div>

            <div className={styles.quantity}>
                <div className={styles.quantityText}>Количество:</div>
                <ProductCounter
                    defaultValue={productCount}
                    withoutDispatch
                    setCount={(count: number) => setProductCount(count)}
                    product={{
                        count: productCount,
                        product: props.product,
                    }}
                />
            </div>

            <Button
                className={styles.greenButton}
                onClick={() => {
                    dispatch(
                        BasketActionCreator.addProductBasket({
                            product: props.product,
                            count: productCount,
                        })
                    );
                }}
            >
                В корзину
            </Button>
        </div>
    );
}

type ProductDetailsProps = { product: Product };
