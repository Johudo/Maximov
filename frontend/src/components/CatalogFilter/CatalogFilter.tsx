import React, { useEffect, useState } from "react";
import styles from "./CatalogFilter.module.scss";
import { ProductType } from "../../types/ProductType";
import Button from "../Button";
import Checkbox from "../Checkbox";
import { ProductProvider } from "../../types/ProductProvider";
import { TypesAPI } from "../../api/TypesAPI";
import { ProvidersAPI } from "../../api/ProvidersAPI";
import { useRouter } from "next/router";

export default function CatalogFilter(props: CatalogFilterProps) {
    const router = useRouter();

    const [minPriceState, setMinPriceState] = useState<number>(
        Number(router.query.min_price) || Number(props.price.min.toFixed(0)) || 0
    );
    const [maxPriceState, setMaxPriceState] = useState<number>(
        Number(router.query.max_price) || Number(props.price.max.toFixed(0)) || 1
    );

    const [selectedTypes, setSelectedTypes] = useState<{
        [id: number]: boolean;
    }>({});
    const [selectedProviders, setSelectedProviders] = useState<{
        [id: number]: boolean;
    }>({});

    const [types, setTypes] = useState<Array<ProductType>>([]);
    const [providers, setProviders] = useState<Array<ProductProvider>>([]);

    async function getTypes() {
        const result = await TypesAPI.getTypes();

        if (result.status === 200) {
            setTypes(result.data);
            return;
        }

        console.log(result);
        alert("Ошибка загрузки типов товаров");
    }

    async function getProviders() {
        const result = await ProvidersAPI.getProviders();

        if (result.status === 200) {
            setProviders(result.data);
            return;
        }

        console.log(result);
        alert("Ошибка загрузки производителей товаров");
    }

    useEffect(() => {
        getTypes();
        getProviders();

        if (typeof router.query.types === "string") {
            const newSelectedTypes: {
                [id: number]: boolean;
            } = {};

            (router.query.types as string)
                .split(",")
                .filter((query_type_id) => Number(query_type_id))
                .forEach((query_type_id) => {
                    newSelectedTypes[Number(query_type_id)] = true;
                });
            setSelectedTypes(newSelectedTypes);
        }

        if (typeof router.query.providers === "string") {
            const newSelectedProviders: {
                [id: number]: boolean;
            } = {};

            (router.query.providers as string)
                .split(",")
                .filter((query_provider_id) => Number(query_provider_id))
                .forEach((query_provider_id) => {
                    newSelectedProviders[Number(query_provider_id)] = true;
                });
            setSelectedProviders(newSelectedProviders);
        }
    }, []);

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
                    <p className={styles.minRange}>{minPriceState} ₽</p>
                    <p className={styles.maxRange}>{maxPriceState} ₽</p>
                </div>
            </div>

            <div className={styles.filterBlock}>
                <h4 className={styles.title}>Тип продукта:</h4>

                <div className={styles.processorCheckboxes}>
                    {types.map((type, index) => {
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
                                    onChange={(event) => {
                                        const newSelectedTypes = selectedTypes;
                                        newSelectedTypes[type.id] = event.target.checked;
                                        setSelectedTypes({ ...newSelectedTypes });
                                    }}
                                    checked={Boolean(selectedTypes[type.id])}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={styles.filterBlock}>
                <h4 className={styles.title}>Производитель:</h4>

                <div className={styles.processorCheckboxes}>
                    {providers.map((provider, index) => {
                        return (
                            <div
                                key={"providers__" + index}
                                className={styles.checkboxBlock}
                                onClick={(event) =>
                                    ((event.currentTarget.children[0] as HTMLInputElement).checked = !(
                                        event.currentTarget.children[0] as HTMLInputElement
                                    ).checked)
                                }
                            >
                                <Checkbox
                                    id={"catalog-provider-checkbox-" + index}
                                    label={provider.name}
                                    onChange={(event) => {
                                        const newSelectedProviders = selectedProviders;
                                        newSelectedProviders[provider.id] = event.target.checked;
                                        setSelectedProviders({ ...newSelectedProviders });
                                    }}
                                    checked={Boolean(selectedProviders[provider.id])}
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
                    const newQuery: { [key: string]: string } = {};
                    const arrayStringQuery: Array<string> = [];

                    for (const typeID in selectedTypes) {
                        if (!selectedTypes[typeID]) continue;

                        if (newQuery["types"]) newQuery["types"] += "," + typeID;
                        else newQuery["types"] = typeID;
                    }

                    for (const providerID in selectedProviders) {
                        if (!selectedProviders[providerID]) continue;

                        if (newQuery["providers"]) newQuery["providers"] += "," + providerID;
                        else newQuery["providers"] = providerID;
                    }

                    if (typeof router.query.name === "string") newQuery["name"] = router.query.name;

                    newQuery["min_price"] = minPriceState.toFixed(0);
                    newQuery["max_price"] = maxPriceState.toFixed(0);

                    for (const key in newQuery) {
                        arrayStringQuery.push(`${key}=${newQuery[key]}`);
                    }

                    location.assign(`${location.pathname}?${arrayStringQuery.join("&")}`);
                }}
            >
                Применить
            </Button>

            <Button type="button" className={styles.resetButton} onClick={() => location.assign(location.pathname)}>
                Сбросить
            </Button>
        </div>
    );
}

type CatalogFilterProps = {
    price: {
        min: number;
        max: number;
    };
};
