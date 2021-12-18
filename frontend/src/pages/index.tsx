import { NextPage, NextPageContext } from "next";
import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { wrapper } from "../store";
import { AuthStartUp } from "../utils/AuthStartUp";
import { BasketStartUp } from "../utils/BasketStartUp";
import styles from "../styles/pages/CatalogPage.module.scss";
import { Product } from "../types/Product";
import { CatalogProductFilter } from "../types/CatalogProductFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import CatalogFilter from "../components/CatalogFilter";
import { TypesAPI } from "../api/TypesAPI";
import { ProductType } from "../types/ProductType";
import ProductCardLine from "../components/ProductCardLine";
import { ProductAPI } from "../api/ProductAPI";

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
    const [catalogProductFilter, setCatalogProductFilter] = useState<CatalogProductFilter>({});

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

        let newProductsList = [...sortList[selectedSortState].sort(props.products)];

        if (catalogProductFilter.price)
            newProductsList = newProductsList.filter(
                (product) =>
                    Number(product.price) >= (catalogProductFilter?.price?.min || 0) &&
                    Number(product.price) <= (catalogProductFilter?.price?.max || 1000000)
            );

        if (Array.isArray(catalogProductFilter.types) && catalogProductFilter.types.length > 0)
            newProductsList = newProductsList.filter((product) =>
                catalogProductFilter.types?.find((type: ProductType) => type.id === product.type.id)
            );

        setShownCatalogProducts(newProductsList);
    }, [selectedSortState, catalogProductFilter]);

    function getMinPrice() {
        if (Array.isArray(props.products) && props.products.length > 0)
            return (
                Number(Math.min.apply(null, [...props.products.map((product) => Number(product.price))]).toFixed(0)) - 1
            );
        else return 0;
    }

    function getMaxPrice() {
        if (Array.isArray(props.products) && props.products.length > 0)
            return (
                Number(Math.max.apply(null, [...props.products.map((product) => Number(product.price))]).toFixed(0)) + 1
            );
        else return 1000000;
    }

    return (
        <PageWrapper>
            <div className={styles.page}>
                <div className={styles.catalogFilter}>
                    <CatalogFilter
                        types={props.types}
                        price={{
                            max: getMaxPrice(),
                            min: getMinPrice(),
                        }}
                        setFilterProducts={setCatalogProductFilter}
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
                            types={props.types}
                            price={{
                                max: getMaxPrice(),
                                min: getMinPrice(),
                            }}
                            setFilterProducts={setCatalogProductFilter}
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

    let types: Array<ProductType> = [];
    let products: Array<Product> = [];

    const typesResult = await TypesAPI.getTypes();
    const productResult = await ProductAPI.getProductsList();

    if (typesResult.status === 200) {
        types = typesResult.data as Array<ProductType>;

        // Filter by type
        // if (!Number.isNaN(Number(context.query.type)))
        //     types = types.filter((type) => type.id === Number(context.query.type));

        // types.forEach((type) => type.product_set?.forEach((product) => products.push(product)));
    }

    if (productResult.status === 200) {
        products = productResult.data as Array<Product>;
    }

    return { types, products } as CatalogPageProps;
});

type CatalogPageProps = { types: Array<ProductType>; products: Array<Product> };

export default CatalogPage;
