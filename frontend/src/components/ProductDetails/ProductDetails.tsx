import React, { useState } from "react";
import styles from "./ProductDetails.module.scss";
import { useDispatch } from "react-redux";
import { BasketActionCreator } from "../../store/actionCreators/basketActionCreator";
import ProductCounter from "../ProductCounter";
import { Product } from "../../types/Product";
import Button from "../Button";
import { ProductStorage } from "../../types/ProductStorage";

export default function ProductDetails(props: ProductDetailsProps) {
    const [productCount, setProductCount] = useState(1);

    const dispatch = useDispatch();

    return (
        <div className={styles.container}>
            <div className={styles.titleBlock}>
                <h2 className={styles.productName}>{props.product.name}</h2>
                <div className={styles.price}>{props.product.price} ₽</div>
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

            {props.product.storage_counts && (
                <div className={styles.storageCountsBlock}>
                    <h3 className={styles.storageCountsTitle}>Количество на складах</h3>

                    <ul className={styles.storageCountsList}>
                        {props.product.storage_counts.map((item) => (
                            <li className={styles.storageCountsItem} key={"product_storage_count__" + item.storage.id}>
                                {`${item.storage.address}: `}
                                <span>{item.count}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

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

type ProductDetailsProps = {
    product: Product & {
        storage_counts?: Array<{
            storage: ProductStorage;
            count: number;
        }>;
    };
};
