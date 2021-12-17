import React from "react";
import styles from "./ProfileProductCard.module.scss";
import gamePCImage from "../../../public/images/productSlideShow/pic1.jpg";
import ProfileProductCardProps from "./ProfileProductCardProps";

export default function ProfileProductCard(props: ProfileProductCardProps) {
    return (
        <a href={`/product/${props.product.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={gamePCImage.src} className={styles.image} alt={props.product.title} />
            </div>

            <div className={styles.rightBlock}>
                <div className={styles.cardCompany}>SCREENON</div>
                <h4 className={styles.cardTitle}>{props.product.title}</h4>
                <p className={styles.cardPrice}>€ {props.product.price}</p>
            </div>
        </a>
    );
}
