import React from "react";
import styles from "./Checkbox.module.scss";
import { CheckboxProps } from "./CheckboxProps";

function Checkbox(
    { className, wrapperClassName, labelClassName, label, id, type, ...otherProps }: CheckboxProps,
    ref: React.ForwardedRef<any>
) {
    return (
        <div className={[styles.checkboxWrapper, wrapperClassName].join(" ").trim()}>
            <input
                type="checkbox"
                ref={ref}
                id={id}
                className={[styles.checkbox, className].join(" ").trim()}
                {...otherProps}
            />
            <label htmlFor={id} className={[styles.checkboxLabel, labelClassName].join(" ").trim()}>
                {label}
            </label>
        </div>
    );
}

export default React.forwardRef(Checkbox);
