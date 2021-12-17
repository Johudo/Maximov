import styles from "./Button.module.scss";
import { ButtonProps } from "./ButtonProps";

export default function Button(props: ButtonProps) {
    const { className, children, ...otherProps } = props;

    return (
        <button className={[styles.button, className].join(" ").trim()} {...otherProps}>
            {children}
        </button>
    );
}
