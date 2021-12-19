import React from "react";
import { Product } from "../../types/Product";
import styles from "./ProductDescription.module.scss";

export default function ProductDescription(props: ProductDescriptionProps) {
    return (
        <div className={styles.productDescription}>
            <h3 className={styles.mainTitle}>Характеристики</h3>

            <ul className={styles.customiserList}>
                <li className={styles.customiserItem}>
                    <span>Производитель: </span>
                    {props.product.provider.name}
                </li>

                <li className={styles.customiserItem}>
                    <span>Страна: </span>
                    {props.product.country.name}
                </li>

                {props.product.characteristics.map((characteristic, index) => {
                    return (
                        <li className={styles.customiserItem} key={"product-description__customiser-item__" + index}>
                            <span>{characteristic.name + ": "}</span>
                            {characteristic.value}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

type ProductDescriptionProps = { product: Product };
