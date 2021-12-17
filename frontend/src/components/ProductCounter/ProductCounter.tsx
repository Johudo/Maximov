import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BasketActionCreator } from "../../store/actionCreators/basketActionCreator";
import styles from "./ProductCounter.module.scss";
import { ProductCounterProps } from "./ProductCounterProps";

export default function ProductCounter(props: ProductCounterProps) {
    const [counterState, setCounterState] = useState(props.defaultValue);

    const dispatch = useDispatch();

    useEffect(() => {
        setCounterState(props.defaultValue);
    }, [props.defaultValue]);

    function onChangeCount(count: number) {
        props.withoutDispatch
            ? setCounterState(!isNaN(Number(count)) && Number(count) >= 0 ? Number(count) : 0)
            : dispatch(BasketActionCreator.changeProductCountBasket(props.product, count));

        if (props.setCount) props.setCount(count);
    }

    return (
        <div className={styles.counterBlock}>
            <button
                type="button"
                className={styles.counterButton}
                onClick={() => {
                    onChangeCount(counterState - 1);
                }}
            >
                -
            </button>
            <input
                type="text"
                value={counterState}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (!isNaN(Number(event.target.value))) {
                        setCounterState(Number(event.target.value));
                        onChangeCount(Number(event.target.value));
                    }
                }}
                className={styles.counterInput}
            />
            <button
                type="button"
                className={styles.counterButton}
                onClick={() => {
                    onChangeCount(counterState + 1);
                }}
            >
                +
            </button>
        </div>
    );
}
