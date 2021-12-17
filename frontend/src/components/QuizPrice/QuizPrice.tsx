import React, { useState } from "react";
import Button from "../Button";
import styles from "./QuizPrice.module.scss";

export default function QuizPrice(props: QuizPriceProps) {
    const [selectedPriceState, setSelectedPriceState] = useState(0);

    return (
        <>
            <div className={styles.selectPriceBlock}>
                {props.priceList.map((elem, index) => {
                    return (
                        <Button
                            key={"quiz__price__" + index}
                            className={selectedPriceState === index ? styles.priceButtonSelected : styles.priceButton}
                            onClick={() => {
                                setSelectedPriceState(index);
                                if (props.onSelectPrice) props.onSelectPrice(elem);
                            }}
                        >
                            {elem.text}
                        </Button>
                    );
                })}
            </div>

            <div className={styles.managePagesBlock}>
                <Button className={styles.prevPageButton} onClick={() => props.toPrevPage()}>
                    Назад
                </Button>
                <Button className={styles.nextPageButton} onClick={() => props.toNextPage()}>
                    ПОКАЗАТЬ РЕЗУЛЬТАТ
                </Button>
            </div>
        </>
    );
}

type QuizPriceProps = {
    toPrevPage: () => void;
    toNextPage: () => void;
    priceList: Array<{ text: string; value: number }>;
    onSelectPrice?: (priceObj: { text: string; value: number }) => void;
};
