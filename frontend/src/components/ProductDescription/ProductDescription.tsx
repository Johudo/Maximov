import React from "react";
import { Product } from "../../types/Product";
import Button from "../Button";
import Textarea from "../Textarea";
import styles from "./ProductDescription.module.scss";

const productInfo = {
    customiser: [
        { type: "Название", data: "Значение" },
        { type: "Название", data: "Значение" },
        { type: "Название", data: "Значение" },
        { type: "Название", data: "Значение" },
        { type: "Название", data: "Значение" },
    ],
};

export default function ProductDescription(props: ProductDescriptionProps) {
    return (
        <div className={styles.productDescription}>
            <h3 className={styles.mainTitle}>Характеристики</h3>

            <ul className={styles.customiserList}>
                {productInfo.customiser.map((elem, index) => {
                    return (
                        <li className={styles.customiserItem} key={"product-description__customiser-item__" + index}>
                            <span>{elem.type + ": "}</span>
                            {elem.data}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

type ProductDescriptionProps = { product: Product; withFeedback?: boolean };
