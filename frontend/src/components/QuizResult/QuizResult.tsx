import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import styles from "./QuizResult.module.scss";
import firstImage from "../../../public/images/productSlideShow/pic1.jpg";
import { Product } from "../../types/Product";
import { QuizAPI } from "../../api/QuizAPI";

const productData = {
    id: 3,
    title: "AMD Ryzen 3 3200G - Quad Core",
    description: "De AMD Ryzen 3 3200G is een uitstekende Quad Core processor die zeer geschikt is voor gaming.",
    picture: firstImage.src,
    price: "200.00",
    recommendation: false,
    types: 2,
    is_for_game: false,
    is_laptop: false,
    is_new: false,
    fps: 0,
};

export default function QuizResult(props: QuizResultProps) {
    const [products, setProducts] = useState<Array<Product>>([]);

    async function getProducts() {
        const result = await QuizAPI.getProducts({ price: props.price });

        if (result.status === 200)
            setProducts(
                (result.data as Array<any>).length <= 3 ? result.data : (result.data as Array<any>).slice(0, 2)
            );
        else {
            setProducts([]);
            console.log(result);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className={styles.resultBlock}>
            <h3 className={styles.resultTitle}>Ваша подборка:</h3>

            <div className={styles.productsList}>
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <div className={styles.productItem} key={`QuizResult__product__${index}`}>
                            <ProductCard withDetails product={product} />
                        </div>
                    ))
                ) : (
                    <div>Список пуст</div>
                )}
            </div>
        </div>
    );
}

type QuizResultProps = {
    price: number;
};
