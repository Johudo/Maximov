import { NextPage, NextPageContext } from "next";
import React from "react";
import PageWrapper from "../../components/PageWrapper";
import { wrapper } from "../../store";
import { AuthStartUp } from "../../utils/AuthStartUp";
import { BasketStartUp } from "../../utils/BasketStartUp";
import OrderingForm from "../../components/OrderingForm";

const OrderingPage: NextPage<OrderingPageProps> = (props: OrderingPageProps) => {
    return (
        <PageWrapper>
            <OrderingForm />
        </PageWrapper>
    );
};

OrderingPage.getInitialProps = wrapper.getInitialPageProps((store) => async (context: NextPageContext) => {
    await AuthStartUp(store, context);
    await BasketStartUp(store, context);

    return {} as OrderingPageProps;
});

type OrderingPageProps = {};

export default OrderingPage;
