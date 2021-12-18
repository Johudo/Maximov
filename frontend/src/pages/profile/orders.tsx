import { NextPage, NextPageContext } from "next";
import ErrorPage from "next/error";
import React from "react";
import PageWrapper from "../../components/PageWrapper";
import { IState, wrapper } from "../../store";
import { AuthStartUp } from "../../utils/AuthStartUp";
import { BasketStartUp } from "../../utils/BasketStartUp";
import styles from "../../styles/pages/ProfilePage.module.scss";
import ProfileNavbar from "../../components/ProfileNavbar";
import { useSelector } from "react-redux";
import ProfileOrder from "../../components/ProfileOrder";
import { OrderAPI, OrderAPIGetOwnOrdersData } from "../../api/OrderAPI";

const ProfilePage: NextPage<ProfilePageProps> = (props: ProfilePageProps) => {
    const isAuthenticated = useSelector((state: IState) => state.user.isAuthenticated);

    if (!isAuthenticated) return <ErrorPage statusCode={404} />;

    return (
        <PageWrapper>
            <div className={styles.page}>
                <ProfileNavbar />

                <div className={styles.ordersList}>
                    {props.orders.map((order, index) => {
                        return <ProfileOrder order={order} key={"users-order__" + index} />;
                    })}
                </div>
            </div>
        </PageWrapper>
    );
};

ProfilePage.getInitialProps = wrapper.getInitialPageProps((store) => async (context: NextPageContext) => {
    await AuthStartUp(store, context);
    await BasketStartUp(store, context);

    const ordersResult = await OrderAPI.getOwnOrders(context.req);

    return { orders: ordersResult.status === 200 ? ordersResult.data : [] } as ProfilePageProps;
});

type ProfilePageProps = { orders: OrderAPIGetOwnOrdersData };

export default ProfilePage;
