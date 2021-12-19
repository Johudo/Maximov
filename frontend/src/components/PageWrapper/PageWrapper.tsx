import React from "react";
import Container from "../Container";
import { PageWrapperProps } from "./PageWrapperProps";
import styles from "./PageWrapper.module.scss";
import Header from "../Header";
import Footer from "../Footer";
import Popup from "../../popups/Popup";
import Basket from "../Basket";
import { IState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { BasketActionCreator } from "../../store/actionCreators/basketActionCreator";
import { useMedia } from "react-use";

export default function PageWrapper(props: PageWrapperProps) {
    const isBasketOpenState = useSelector((state: IState) => state.basket.isOpen);
    const isMobile = useMedia("max-width: 1000px");
    const dispatch = useDispatch();

    return (
        <div className={styles.app} onClick={() => isBasketOpenState && dispatch(BasketActionCreator.closeBasket())}>
            <Popup />
            <Header />

            {isMobile && (
                <div
                    className={isBasketOpenState ? styles.mobileBasket : styles.mobileBasketHidden}
                    onClick={(event) => event.stopPropagation()}
                >
                    <Basket />
                </div>
            )}

            <main className={styles.main}>
                <Container>{props.children}</Container>
            </main>

            <Footer />
        </div>
    );
}
