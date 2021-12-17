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
import ProfileOrdersList from "../../components/ProfileOrdersList";

const ProfilePage: NextPage<ProfilePageProps> = (props: ProfilePageProps) => {
    const isAuthenticated = useSelector((state: IState) => state.user.isAuthenticated);

    if (!isAuthenticated) return <ErrorPage statusCode={404} />;

    return (
        <PageWrapper>
            <div className={styles.page}>
                <ProfileNavbar />
                <ProfileOrdersList />
            </div>
        </PageWrapper>
    );
};

ProfilePage.getInitialProps = wrapper.getInitialPageProps((store) => async (context: NextPageContext) => {
    await AuthStartUp(store, context);
    await BasketStartUp(store, context);

    return {} as ProfilePageProps;
});

type ProfilePageProps = {};

export default ProfilePage;
