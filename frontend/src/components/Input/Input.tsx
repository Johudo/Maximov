import { InputProps } from "./InputProps";
import styles from "./Input.module.scss";
import React from "react";

function Input({ className, error, ...otherProps }: InputProps, ref: React.ForwardedRef<any>) {
    return (
        <input
            ref={ref}
            className={[styles.input, error ? styles.errorInput : "", className].join(" ").trim()}
            {...otherProps}
        />
    );
}

export default React.forwardRef(Input);
