import { TextareaProps } from "./TextareaProps";
import styles from "./Textarea.module.scss";
import React from "react";
function Textarea(props: TextareaProps, ref: React.ForwardedRef<any>) {
    const { className, error, ...otherProps } = props;

    return (
        <textarea
            className={[styles.textarea, error ? styles.errorTextarea : "", className].join(" ").trim()}
            ref={ref}
            {...otherProps}
        />
    );
}

export default React.forwardRef(Textarea);
