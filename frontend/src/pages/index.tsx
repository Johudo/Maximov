import { NextPage, NextPageContext } from "next";
import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { wrapper } from "../store";
import { AuthStartUp } from "../utils/AuthStartUp";
import { BasketStartUp } from "../utils/BasketStartUp";
import styles from "../styles/pages/CatalogPage.module.scss";
import { Product } from "../types/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import CatalogFilter from "../components/CatalogFilter";
import ProductCardLine from "../components/ProductCardLine";
import { ProductAPI, ProductAPIGetProductsListData, ProductAPIGetProductsListParams } from "../api/ProductAPI";

enum SortVariablesEnum {
    sortByPriceUp,
    sortByPriceDown,
    sortByAlpthabetAtoZ,
    sortByAlpthabetZtoA,
}

export enum CatalogProductTypesEnum {
    allProducts,
    laptopsProducts,
    gameDesctopsProducts,
    newProducts,
}

const CatalogPage: NextPage<CatalogPageProps> = (props: CatalogPageProps) => {
    const [mobileCatalogFilterShown, setMobileCatalogFilterShown] = useState(false);
    const [catalogSortShown, setCatalogSortShown] = useState(false);
    const [selectedSortState, setSelectedSortState] = useState<SortVariablesEnum>(SortVariablesEnum.sortByPriceUp);

    const [shownCatalogProducts, setShownCatalogProducts] = useState<Product[]>(props.products);

    const sortList = [
        {
            name: "По возврастанию цены",
            type: SortVariablesEnum.sortByPriceUp,
            sort: (products: Product[]) =>
                products.sort((product_1, product_2) => Number(product_1.price) - Number(product_2.price)),
        },
        {
            name: "По убыванию цены",
            type: SortVariablesEnum.sortByPriceDown,
            sort: (products: Product[]) =>
                products.sort((product_1, product_2) => Number(product_2.price) - Number(product_1.price)),
        },
        {
            name: "По алфавиту A-Z",
            type: SortVariablesEnum.sortByAlpthabetAtoZ,
            sort: (products: Product[]) =>
                products.sort((product_1, product_2) => (product_1.name > product_2.name ? 1 : -1)),
        },
        {
            name: "По алфавиту Z-A",
            type: SortVariablesEnum.sortByAlpthabetZtoA,
            sort: (products: Product[]) =>
                products.sort((product_1, product_2) => (product_1.name > product_2.name ? -1 : 1)),
        },
    ];

    useEffect(() => {
        if (!Array.isArray(props.products) || props.products.length < 1) return;
        setShownCatalogProducts([...sortList[selectedSortState].sort(props.products)]);
    }, [selectedSortState]);

    return (
        <PageWrapper>
            <div className={styles.page}>
                <div className={styles.catalogFilter}>
                    <CatalogFilter
                        price={{
                            max: props.priceRange.max,
                            min: props.priceRange.min,
                        }}
                    />
                </div>

                <div
                    className={
                        mobileCatalogFilterShown
                            ? styles.mobileCatalogFilterWrapper
                            : styles.mobileCatalogFilterWrapperHidden
                    }
                    onClick={(event) => {
                        if (event.target === event.currentTarget)
                            setMobileCatalogFilterShown(!mobileCatalogFilterShown);
                    }}
                >
                    <div className={styles.mobileCatalogFilter}>
                        <div className={styles.mobileCatalogFilterTop}>
                            <FontAwesomeIcon
                                icon={faTimes}
                                onClick={() => setMobileCatalogFilterShown(!mobileCatalogFilterShown)}
                                className={styles.mobileCatalogFilterCloseButton}
                            />
                        </div>

                        <CatalogFilter
                            price={{
                                max: props.priceRange.max,
                                min: props.priceRange.min,
                            }}
                        />
                    </div>
                </div>

                <div className={styles.mainBlock}>
                    <div className={styles.topBlock}>
                        <div className={styles.titleBlock}>
                            <h3 className={styles.title}>Каталог</h3>
                            <span>Показано {shownCatalogProducts.length} товаров</span>
                        </div>

                        <div className={styles.manageBlock}>
                            <div
                                className={styles.filterBlock}
                                onClick={() => setMobileCatalogFilterShown(!mobileCatalogFilterShown)}
                            >
                                <FontAwesomeIcon icon={faFilter} />
                                Фильтр
                            </div>

                            <div className={styles.sortBlock}>
                                <div
                                    className={styles.sortTitle}
                                    onClick={() => setCatalogSortShown(!catalogSortShown)}
                                >
                                    Сортировать: {sortList[selectedSortState].name}
                                    <FontAwesomeIcon icon={faAngleDown} />
                                </div>

                                <ul className={catalogSortShown ? styles.sortMenu : styles.sortMenuHidden}>
                                    {sortList.map((item, index) => (
                                        <li
                                            className={
                                                selectedSortState === index
                                                    ? styles.sortMenuItemSelected
                                                    : styles.sortMenuItem
                                            }
                                            onClick={() => {
                                                setCatalogSortShown(false);
                                                setSelectedSortState(sortList[index].type);
                                            }}
                                            key={"catalog-sort-item-" + index}
                                        >
                                            {item.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={styles.productsListLine}>
                        {shownCatalogProducts.map((product, index) => (
                            <ProductCardLine product={product} key={"catalog-item-" + index} />
                        ))}
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

CatalogPage.getInitialProps = wrapper.getInitialPageProps((store) => async (context: NextPageContext) => {
    await AuthStartUp(store, context);
    await BasketStartUp(store, context);

    let props: CatalogPageProps = { products: [], priceRange: { max: 0, min: 1 } };

    const getProductsParams: ProductAPIGetProductsListParams = {};
    if (typeof context.query.name === "string") getProductsParams.name = context.query.name;
    if (typeof context.query.min_price === "string") getProductsParams.min_price = context.query.min_price;
    if (typeof context.query.max_price === "string") getProductsParams.max_price = context.query.max_price;
    if (typeof context.query.types === "string") getProductsParams.types = context.query.types;
    if (typeof context.query.providers === "string") getProductsParams.providers = context.query.providers;

    const productResult = await ProductAPI.getProductsList(getProductsParams);

    if (productResult.status === 200) {
        props = {
            products: (productResult.data as ProductAPIGetProductsListData).products,
            priceRange: (productResult.data as ProductAPIGetProductsListData).price_range,
        };
    }

    return props;
});

type CatalogPageProps = {
    products: Array<Product>;
    priceRange: {
        max: number;
        min: number;
    };
};

export default CatalogPage;
