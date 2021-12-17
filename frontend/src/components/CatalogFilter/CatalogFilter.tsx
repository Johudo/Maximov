import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "./CatalogFilter.module.scss";
import firstImage from "../../../public/images/games/quizGame1.png";
import secondImage from "../../../public/images/games/quizGame2.png";
import thImage from "../../../public/images/games/quizGame3.png";
import fourthImage from "../../../public/images/games/quizGame4.png";
import fifthImage from "../../../public/images/games/quizGame5.png";
import sixthImage from "../../../public/images/games/quizGame6.png";
import sevImage from "../../../public/images/games/quizGame7.png";
import eiImage from "../../../public/images/games/quizGame8.png";
import { ProductType } from "../../types/ProductType";
import { CatalogProductFilter } from "../../types/CatalogProductFilter";
import Button from "../Button";
import Checkbox from "../Checkbox";

const gamesList = [
    {
        name: "1",
        image: firstImage.src,
        selected: false,
    },
    {
        name: "2",
        image: secondImage.src,
        selected: false,
    },
    {
        name: "3",
        image: thImage.src,
        selected: false,
    },
    {
        name: "4",
        image: fourthImage.src,
        selected: false,
    },
    {
        name: "5",
        image: fifthImage.src,
        selected: false,
    },
    {
        name: "6",
        image: sixthImage.src,
        selected: false,
    },
    {
        name: "7",
        image: sevImage.src,
        selected: false,
    },
    {
        name: "8",
        image: eiImage.src,
        selected: false,
    },
];

export default function CatalogFilter(props: CatalogFilterProps) {
    const [minPriceState, setMinPriceState] = useState(100);
    const [maxPriceState, setMaxPriceState] = useState(5000);

    const [isPriceRangeSet, setIsPriceRangeSet] = useState(false);

    const [selectedTypes, setSelectedTypes] = useState<ProductType[]>([]);

    useEffect(() => {
        if (isPriceRangeSet || !props.price.min || !props.price.max) return;

        setMinPriceState(Number(props.price.min.toFixed(0)));
        setMaxPriceState(Number(props.price.max.toFixed(0)));

        setIsPriceRangeSet(true);
    }, [props.price]);

    return (
        <div className={styles.catalogFilter}>
            <div className={styles.priceRangeFilter}>
                <h4 className={styles.priceTitle}>Цена</h4>

                <div className={styles.slider}>
                    <input
                        type="range"
                        min={props.price.min}
                        max={props.price.max}
                        value={minPriceState}
                        className={styles.sliderInput}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            if (Number(event.target.value) <= maxPriceState)
                                setMinPriceState(Number(event.target.value));
                        }}
                    />

                    <input
                        type="range"
                        min={props.price.min}
                        max={props.price.max}
                        value={maxPriceState}
                        className={styles.sliderInput}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            if (Number(event.target.value) >= minPriceState)
                                setMaxPriceState(Number(event.target.value));
                        }}
                    />

                    <div
                        className={styles.minSliderFuller}
                        style={{
                            width:
                                ((minPriceState - props.price.min) * 100) / (props.price.max - props.price.min) + "%",
                        }}
                    ></div>
                    <div
                        className={styles.maxSliderFuller}
                        style={{
                            width:
                                100 -
                                ((maxPriceState - props.price.min) * 100) / (props.price.max - props.price.min) +
                                "%",
                        }}
                    ></div>
                </div>

                <div className={styles.ranges}>
                    <p className={styles.minRange}>€ {minPriceState}</p>
                    <p className={styles.maxRange}>€ {maxPriceState}</p>
                </div>
            </div>

            <div className={styles.filterBlock}>
                <h4 className={styles.title}>Тип продукта:</h4>

                <div className={styles.processorCheckboxes}>
                    {props.types.map((type, index) => {
                        return (
                            <div
                                key={"types__" + index}
                                className={styles.checkboxBlock}
                                onClick={(event) =>
                                    ((event.currentTarget.children[0] as HTMLInputElement).checked = !(
                                        event.currentTarget.children[0] as HTMLInputElement
                                    ).checked)
                                }
                            >
                                <Checkbox
                                    id={"catalog-type-checkbox-" + index}
                                    label={type.name}
                                    onChange={() => {
                                        const foundIndex = selectedTypes.indexOf(type);
                                        setSelectedTypes(
                                            foundIndex > -1
                                                ? selectedTypes.filter((selectedType) => selectedType.id !== type.id)
                                                : [...selectedTypes, type]
                                        );
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            <Button
                type="button"
                className={styles.confirmButton}
                onClick={() => {
                    let newFilter: CatalogProductFilter = {};
                    newFilter = { ...newFilter, price: { min: minPriceState, max: maxPriceState } };

                    if (selectedTypes.length > 0) newFilter = { ...newFilter, types: selectedTypes };

                    props.setFilterProducts(newFilter);
                }}
            >
                Применить
            </Button>
        </div>
    );
}

type CatalogFilterProps = {
    price: {
        min: number;
        max: number;
    };

    setFilterProducts: (filter: CatalogProductFilter) => void;

    types: Array<ProductType>;
};
