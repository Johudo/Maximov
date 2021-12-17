import React from "react";
import Container from "../Container";
import { PageWrapperProps } from "./PageWrapperProps";
import styles from "./PageWrapper.module.scss";
import Header from "../Header";
import Footer from "../Footer";
import Popup from "../../popups/Popup";
import Navbar from "../Navbar";
import Basket from "../Basket";
import { IState } from "../../store";
import { useSelector } from "react-redux";

export default function PageWrapper(props: PageWrapperProps) {
    const isBasketOpenState = useSelector((state: IState) => state.basket.isOpen);
    const isNavbarShownState = useSelector((state: IState) => state.mobileNavbar.isOpen);

    return (
        <div className={styles.app}>
            <Popup />
            <Header />

            <div
                className={isBasketOpenState ? styles.mobileBasket : styles.mobileBasketHidden}
                onClick={(event) => event.stopPropagation()}
            >
                <Basket />
            </div>

            <main className={styles.main}>
                <Container>{props.children}</Container>
            </main>

            <Footer />
        </div>
    );
}
