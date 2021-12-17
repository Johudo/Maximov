import { faList, faTh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Product } from "../../types/Product";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import styles from "./CustomizerCategory.module.scss";
import animations from "./CustomizerCategoryAnimations.module.scss";

export default function CustomizerCategory(props: CustomizerCategoryProps) {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const [isTableCategory, setIsTableCategory] = useState(false);

    const imageRef = React.useRef(null);
    const decriptionRef = React.useRef(null);

    return (
        <div>
            <div className={styles.categoryTitleBlock}>
                <h4 className={styles.categoryTitle}>{props.title}</h4>
                <div className={styles.catalogView}>
                    <div
                        onClick={() => setIsTableCategory(false)}
                        className={isTableCategory ? styles.iconWrapper : styles.iconWrapperSelected}
                    >
                        <FontAwesomeIcon icon={faList} className={styles.catalogViewItem} />
                    </div>
                    <div
                        onClick={() => setIsTableCategory(true)}
                        className={!isTableCategory ? styles.iconWrapper : styles.iconWrapperSelected}
                    >
                        <FontAwesomeIcon icon={faTh} className={styles.catalogViewItem} />
                    </div>
                </div>
            </div>

            <p className={styles.description}>{props.description}</p>

            {isTableCategory ? (
                <div className={styles.tableCatrgories}>
                    {props.products.map((item, index) => {
                        return (
                            <div
                                className={selectedItemIndex === index ? styles.selectedItem : styles.item}
                                key={props.keyValue + "item__" + index}
                                onClick={() => {
                                    setSelectedItemIndex(index);
                                    props.setCustomState(item);
                                }}
                            >
                                <div className={styles.itemName}>{item.title}</div>

                                <div className={styles.imageBlock}>
                                    <div className={styles.imageWrapper}>
                                        <img src={item.picture} alt={item.title} />
                                    </div>
                                    <div className={styles.itemPrice}>€ {item.price}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className={styles.flexContent}>
                    <div className={styles.imageWrapper}>
                        <TransitionGroup component={React.Fragment}>
                            <CSSTransition
                                timeout={300}
                                classNames={{
                                    enter: animations.ImageEnter,
                                    enterActive: animations.ImageEnterActive,
                                    exit: animations.ImageExit,
                                    exitActive: animations.ImageExitActive,
                                }}
                                key={selectedItemIndex}
                                nodeRef={imageRef}
                            >
                                <img
                                    ref={imageRef}
                                    src={props.products[selectedItemIndex].picture}
                                    alt={props.products[selectedItemIndex].title}
                                />
                            </CSSTransition>
                        </TransitionGroup>
                    </div>

                    <div className={styles.rightBlock}>
                        <div className={styles.itemsList}>
                            {props.products.map((item, index) => {
                                return (
                                    <div
                                        className={selectedItemIndex === index ? styles.selectedItem : styles.item}
                                        key={props.keyValue + "item__" + index}
                                        onClick={() => {
                                            setSelectedItemIndex(index);
                                            props.setCustomState(item);
                                        }}
                                    >
                                        <div className={styles.itemName}>{item.title}</div>
                                        <div className={styles.itemPrice}>€ {item.price}</div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className={styles.itemInfoWrapper}>
                            <TransitionGroup component={React.Fragment}>
                                <CSSTransition
                                    timeout={300}
                                    classNames={{
                                        enter: animations.InfoEnter,
                                        enterActive: animations.InfoEnterActive,
                                        exit: animations.InfoExit,
                                        exitActive: animations.InfoExitActive,
                                    }}
                                    key={selectedItemIndex}
                                    nodeRef={decriptionRef}
                                >
                                    <div className={styles.itemInfo} ref={decriptionRef}>
                                        <h5 className={styles.itemTitle}>{props.products[selectedItemIndex].title}</h5>
                                        <p className={styles.itemDescription}>
                                            {props.products[selectedItemIndex].description}
                                        </p>
                                    </div>
                                </CSSTransition>
                            </TransitionGroup>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

type CustomizerCategoryProps = {
    title: string;
    description: string;
    products: Array<Product>;
    keyValue: string;

    setCustomState: (newState: Product) => void;
};
