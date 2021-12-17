import React from "react";
import styles from "./SmallCategoryCard.module.scss";

export default function SmallCategoryCard(props: SmallCategoryCardProps) {
    return (
        <a href={props.url} className={styles.category}>
            <div className={styles.imageWrapper}>
                <img src={props.image} alt={props.name} className={styles.image} />
            </div>

            <div className={styles.name}>{props.name}</div>
        </a>
    );
}

type SmallCategoryCardProps = {
    url: string;
    name: string;
    image: string;
};
