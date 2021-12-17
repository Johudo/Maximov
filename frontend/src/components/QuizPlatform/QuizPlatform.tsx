import React, { useState } from "react";
import styles from "./QuizPlatform.module.scss";

import firstImage from "../../../public/images/quiz/platforms/quizPlatform3.png";
import secondImage from "../../../public/images/quiz/platforms/quizPlatform4.png";
import firstImageSelected from "../../../public/images/quiz/platforms/quizPlatform3Selected.png";
import secondImageSelected from "../../../public/images/quiz/platforms/quizPlatform4Selected.png";
import Button from "../Button";

export default function QuizPlatform(props: QuizPlatformProps) {
    const [typeSelectedState, setTypeSelectedState] = useState(0);
    const [platfotmSelectedState, setPlatfotmSelectedState] = useState(0);

    return (
        <div>
            <div className={styles.deviceTypeBlock}>
                <Button
                    className={typeSelectedState === 0 ? styles.deviceTypeButtonActive : styles.deviceTypeButton}
                    onClick={() => setTypeSelectedState(0)}
                >
                    Desktop
                </Button>
                <Button
                    className={typeSelectedState === 1 ? styles.deviceTypeButtonActive : styles.deviceTypeButton}
                    onClick={() => setTypeSelectedState(1)}
                >
                    Laptop
                </Button>
            </div>

            <div className={styles.platformsBlock}>
                <div
                    className={styles.platformsImageWrapper}
                    onClick={() => {
                        setPlatfotmSelectedState(0);
                    }}
                >
                    <div className={styles.platformsImageWrapperChild}>
                        {platfotmSelectedState === 0 ? (
                            <img src={firstImageSelected.src} alt="Platform 1" />
                        ) : (
                            <img src={firstImage.src} alt="Platform 1" />
                        )}
                    </div>
                </div>
                <div
                    className={styles.platformsImageWrapper}
                    onClick={() => {
                        setPlatfotmSelectedState(1);
                    }}
                >
                    <div className={styles.platformsImageWrapperChild}>
                        {platfotmSelectedState === 1 ? (
                            <img src={secondImageSelected.src} alt="Platform 2" />
                        ) : (
                            <img src={secondImage.src} alt="Platform 2" />
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.managePagesBlock}>
                <Button className={styles.prevPageButton} onClick={() => props.toPrevPage()}>
                    Назад
                </Button>
                <Button className={styles.nextPageButton} onClick={() => props.toNextPage()}>
                    Далее
                </Button>
            </div>
        </div>
    );
}

type QuizPlatformProps = {
    toPrevPage: () => void;
    toNextPage: () => void;
};
