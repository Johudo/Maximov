import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.scss";
import logoImg from "../../../public/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store";
import Container from "../Container";
import { PopupActionCreator } from "../../store/actionCreators/popupActionCreator";
import { PopupTypeEnum } from "../../popups/Popup/PopupTypeEnum";
import { BasketActionCreator } from "../../store/actionCreators/basketActionCreator";
import Basket from "../Basket";
import Input from "../Input";
import Button from "../Button";
import { useMedia } from "react-use";
import { useRouter } from "next/router";

export default function Header() {
    const router = useRouter();

    const [isSearchShownState, setIsSearchShownState] = useState(false);
    const [findInputState, setFindInputState] = useState(
        typeof router.query.name === "string" ? router.query.name : ""
    );

    const basketState = useSelector((state: IState) => state.basket);
    const userState = useSelector((state: IState) => state.user);

    const isMobile = useMedia("(max-width: 1000px)", false);
    const dispatch = useDispatch();

    function toogleSearch() {
        setIsSearchShownState(!isSearchShownState);
    }

    useEffect(() => {
        if (typeof router.query.name === "string" || !router.query.name) setFindInputState(router.query.name || "");
    }, [router.query.name]);

    return (
        <div className={styles.sticky}>
            <header className={styles.background}>
                <Container className={styles.container}>
                    <FontAwesomeIcon
                        icon={faBars}
                        className={styles.bars}
                        onClick={(event) => {
                            dispatch(BasketActionCreator.closeBasket());
                            event.stopPropagation();
                        }}
                    />

                    <h1 className={styles.logo}>
                        <a href="/" className={styles.logoLink}>
                            <img src={logoImg.src} alt="ScreenOn" className={styles.logoImage} />
                        </a>
                    </h1>

                    <form
                        className={styles.inputBlock}
                        onSubmit={(event) => {
                            event.preventDefault();
                            location.assign("?name=" + findInputState);
                        }}
                    >
                        <Input
                            type="text"
                            placeholder="Поиск по сайту"
                            className={styles.input}
                            value={findInputState}
                            onChange={(event) => setFindInputState(event.target.value)}
                        />
                        <Button className={styles.button}>
                            <FontAwesomeIcon icon={faSearch} className={styles.icon} />
                        </Button>
                    </form>

                    <div className={styles.rightBlock}>
                        <FontAwesomeIcon icon={faSearch} className={styles.mobileSearchButton} onClick={toogleSearch} />

                        <FontAwesomeIcon
                            icon={faUser}
                            className={styles.icon}
                            onClick={() =>
                                userState.isAuthenticated
                                    ? location.assign("/profile")
                                    : dispatch(PopupActionCreator.openPopup(PopupTypeEnum.login))
                            }
                        />

                        <div className={styles.basketBlock}>
                            <div
                                onClick={(event) => {
                                    dispatch(BasketActionCreator.toggleBasket());
                                    event.stopPropagation();
                                }}
                            >
                                <FontAwesomeIcon icon={faShoppingCart} className={styles.basketIcon} />
                                <span className={styles.basketCounter}>
                                    {basketState.products.reduce((previous, current) => previous + current.count, 0)}
                                </span>
                            </div>

                            {!isMobile && (
                                <div className={[styles.basketCard, !basketState.isOpen && styles.closed].join(" ")}>
                                    <Basket />
                                </div>
                            )}
                        </div>
                    </div>
                </Container>

                <div className={isSearchShownState ? styles.mobileSearch : styles.mobileSearchHidden}>
                    <form className={styles.mobileInputBlock}>
                        <input type="text" placeholder="Поиск по сайту" className={styles.input} />
                        <button type="button" className={styles.button}>
                            <FontAwesomeIcon icon={faSearch} className={styles.icon} />
                        </button>
                    </form>
                </div>
            </header>
        </div>
    );
}
