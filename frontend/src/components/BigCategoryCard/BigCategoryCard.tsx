import React from "react";
import styles from "./BigCategoryCard.module.scss";

export default function BigCategoryCard(props: BigCategoryCardProps) {
    return (
        <a href={props.url} className={styles.category}>
            <div className={styles.wrapper}>
                <img src={props.image} alt={props.name} className={styles.image} />
                <div className={styles.button}>{props.name}</div>
            </div>
        </a>
    );
}

type BigCategoryCardProps = {
    url: string;
    image: string;
    name: string;
};
