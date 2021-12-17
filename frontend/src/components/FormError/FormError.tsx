import React from "react";
import styles from "./FormError.module.scss";

export default function FormError(props: FormErrorProps) {
    const { errors, ...otherProps } = props;

    const errorsMessages = Object.entries(errors).map((error: any) => {
        return error[1].message;
    });

    if (errorsMessages.length > 0)
        return (
            <ul className={styles.errorsList}>
                {errorsMessages.map((error, index) => {
                    return <li key={props.keyValue + "-" + index}>{error}</li>;
                })}
            </ul>
        );
    else return null;
}

type FormErrorProps = {
    keyValue: string;
    errors: any;
};
