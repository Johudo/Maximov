import { NextPage, NextPageContext } from "next";
import ErrorPage from "next/error";
import React, { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { wrapper } from "../../store";
import { AuthStartUp } from "../../utils/AuthStartUp";
import { BasketStartUp } from "../../utils/BasketStartUp";
import styles from "../../styles/pages/ProductPage.module.scss";
import { Product } from "../../types/Product";
import { ProductAPI } from "../../api/ProductAPI";
import ProductSlideShow from "../../components/ProductSlideShow";
import ProductDescription from "../../components/ProductDescription";
import ProductDetails from "../../components/ProductDetails";

const ProductPage: NextPage<ProductPageProps> = (props: ProductPageProps) => {
    const [rightColumnElem, setRightColumnElem] = useState<HTMLDivElement>();

    if (!props.product) return <ErrorPage statusCode={404} />;

    return (
        <PageWrapper>
            <div className={styles.page}>
                <div className={styles.leftColumn}>
                    <div className={styles.productSlideShow}>
                        <ProductSlideShow images={props.product ? [props.product.image] : [""]} />
                    </div>
                    <ProductDescription product={props.product} withFeedback />
                </div>
                <div
                    className={styles.rightColumn}
                    ref={(elem) => setRightColumnElem(elem as HTMLDivElement)}
                    style={rightColumnElem !== undefined ? { top: rightColumnElem.offsetTop } : {}}
                >
                    <ProductDetails product={props.product} />
                </div>

                <div className={styles.modilePage}>
                    <ProductSlideShow images={props.product ? [props.product.image] : [""]} />
                    <ProductDetails product={props.product} />
                    <ProductDescription product={props.product} withFeedback />
                </div>
            </div>
        </PageWrapper>
    );
};

ProductPage.getInitialProps = wrapper.getInitialPageProps((store) => async (context: NextPageContext) => {
    await AuthStartUp(store, context);
    await BasketStartUp(store, context);

    let product: Product | undefined = undefined;

    const productResult = await ProductAPI.getProduct(Number(context.query.id));
    if (productResult.status === 200) product = productResult.data;

    return { product } as ProductPageProps;
});

type ProductPageProps = { product?: Product | undefined };

export default ProductPage;
