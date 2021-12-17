import React from "react";
import styles from "./Preloader.module.scss";
import PreloaderProps from "./PreloaderProps";

function Preloader(props: PreloaderProps) {
    return (
        <div className={props.inline ? styles.inlineLdsRing : styles.ldsRing}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default Preloader;
