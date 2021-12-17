import React from "react";
import Button from "../../components/Button";
import styles from "./InfoPopup.module.scss";
import InfoPopupProps from "./InfoPopupProps";

export default function InfoPopup(props: InfoPopupProps) {
    return (
        <>
            <h3>{props.title}</h3>
            <p className={styles.description}>{props.description}</p>
            <Button className={styles.button} onClick={props.buttonOnClick}>
                Войти
            </Button>
        </>
    );
}
