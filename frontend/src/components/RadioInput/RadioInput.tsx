import React from "react";
import styles from "./RadioInput.module.scss";
import { RadioInputProps } from "./RadioInputProps";

function RadioInput(
    { className, wrapperClassName, labelClassName, label, id, type, ...otherProps }: RadioInputProps,
    ref: React.ForwardedRef<any>
) {
    return (
        <div className={[styles.radioWrapper, wrapperClassName].join(" ").trim()}>
            <input
                type="radio"
                ref={ref}
                id={id}
                className={[styles.radio, className].join(" ").trim()}
                {...otherProps}
            />
            <label htmlFor={id} className={[styles.radioLabel, labelClassName].join(" ").trim()}>
                {label}
            </label>
        </div>
    );
}

export default React.forwardRef(RadioInput);
