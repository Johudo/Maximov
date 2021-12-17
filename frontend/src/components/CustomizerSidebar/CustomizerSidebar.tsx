import React, { useEffect, useState } from "react";
import styles from "./CustomizerSidebar.module.scss";
import fortniteImage from "../../../public/images/games/quizGame1.png";
import valorantImage from "../../../public/images/games/quizGame2.png";
import cyberpankImage from "../../../public/images/games/quizGame3.png";
import overwatchImage from "../../../public/images/games/quizGame4.png";
import pcImage from "../../../public/images/mainSmallCategories/stillEdition.webp";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import { IState } from "../../store";
import { BasketActionCreator } from "../../store/actionCreators/basketActionCreator";

const selectOptions = [
    {
        name: "CYBERPUNK 2077",
        image: cyberpankImage,
        fps1080: 0.475,
        fps1440: 0.25,
    },
    {
        name: "Fortnite",
        image: fortniteImage,
        fps1080: 0.625,
        fps1440: 0.6,
    },
    {
        name: "Valorant",
        image: valorantImage,
        fps1080: 0.7,
        fps1440: 0.5,
    },
    {
        name: "Overwatch",
        image: overwatchImage,
        fps1080: 1,
        fps1440: 0.8,
    },
];

const FPSMaxRangeCount = 300;

export default function CustomizerSidebar() {
    const [selectedGameState, setSelectedGameState] = useState(0);
    const [isOptionsListShownState, setIsOptionsListShownState] = useState(false);
    const [currentFPSCount, setCurrentFPSCount] = useState(0);

    const customiserState = useSelector((state: IState) => state.custom.products);

    const dispatch = useDispatch();

    function toggleOptionList() {
        setIsOptionsListShownState(!isOptionsListShownState);
    }

    useEffect(() => {
        if (!Array.isArray(customiserState) || customiserState.length < 1) return;

        let newFPS = 0;
        customiserState.forEach((item) => (newFPS += item.fps));
        setCurrentFPSCount(newFPS);
    }, [customiserState]);

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarTop}>
                <div className={styles.selector}>
                    <div className={styles.selectorSelectedOption} onClick={toggleOptionList}>
                        {selectOptions[selectedGameState].name}
                    </div>

                    <div
                        className={
                            isOptionsListShownState ? styles.selectorOptionsList : styles.selectorOptionsListHidden
                        }
                    >
                        {selectOptions.map((elem, index) => {
                            return (
                                <div
                                    key={"customizer__sidebar__selector__options__" + index}
                                    className={styles.selectorOption}
                                    onClick={() => {
                                        setSelectedGameState(index);
                                        toggleOptionList();
                                    }}
                                >
                                    {elem.name}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div
                    className={styles.gameImage}
                    style={{
                        backgroundImage: "url(" + selectOptions[selectedGameState].image.src + ")",
                    }}
                ></div>

                <div className={styles.fpsInfoBlock}>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progress}
                            style={{
                                width:
                                    "calc(100% / " +
                                    FPSMaxRangeCount +
                                    " * " +
                                    (selectOptions[selectedGameState].fps1080 * currentFPSCount).toFixed(0) +
                                    ")",
                            }}
                        ></div>
                        <span>
                            1080 | {(selectOptions[selectedGameState].fps1080 * currentFPSCount).toFixed(0)} FPS
                        </span>
                    </div>

                    <div className={styles.progressBar}>
                        <div
                            className={styles.progress}
                            style={{
                                width:
                                    "calc(100% / " +
                                    FPSMaxRangeCount +
                                    " * " +
                                    (selectOptions[selectedGameState].fps1440 * currentFPSCount).toFixed(0) +
                                    ")",
                            }}
                        ></div>
                        <span>
                            1440 | {(selectOptions[selectedGameState].fps1440 * currentFPSCount).toFixed(0)} FPS
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.productInfo}>
                <div className={styles.productName}>
                    <span>SCREENON</span> | AMD Ryzen 3 3200G
                </div>

                <div className={styles.productImageWrapper}>
                    <img
                        src={customiserState.length > 0 ? customiserState[0].picture : pcImage.src}
                        alt="customiser-result"
                    />
                </div>

                <div className={styles.customInfo}>
                    {customiserState.map((product, index) => (
                        <div className={styles.customInfoItem} key={"customize__sidebar__characteristics__" + index}>
                            <div className={styles.customInfoItemWrapper}>
                                {/* <img
                                    src={product.picture}
                                    // alt={String(product.types)}
                                    className={styles.customInfoItemImage}
                                /> */}
                            </div>
                            <span>{product.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.toBasketButtonBlock}>
                <Button
                    onClick={() => {
                        customiserState.forEach((item) => {
                            dispatch(
                                BasketActionCreator.addProductBasket({
                                    product: item,
                                    count: 1,
                                })
                            );
                        });
                    }}
                >
                    В КОРЗИНУ
                </Button>

                <span>
                    {(() => {
                        let result = 0;

                        Object.entries(customiserState).forEach((item) => {
                            if (!item[1]) return;

                            result += Number(item[1].price);
                        });

                        return "€ " + result.toFixed(2);
                    })()}
                </span>
            </div>
        </div>
    );
}
