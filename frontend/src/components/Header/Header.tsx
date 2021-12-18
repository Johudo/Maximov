import React, { useState } from "react";
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
import { MobileNavbarActionCreator } from "../../store/actionCreators/mobileNavbarActionCreator";
import Link from "next/link";

export default function Header() {
    const [isSearchShownState, setIsSearchShownState] = useState(false);
    const [findInputState, setFindInputState] = useState("");

    const basketState = useSelector((state: IState) => state.basket);
    const userState = useSelector((state: IState) => state.user);

    const dispatch = useDispatch();

    function toogleSearch() {
        setIsSearchShownState(!isSearchShownState);
    }

    return (
        <div className={styles.sticky}>
            <header className={styles.background}>
                <Container className={styles.container}>
                    <FontAwesomeIcon
                        icon={faBars}
                        className={styles.bars}
                        onClick={(event) => {
                            dispatch(MobileNavbarActionCreator.toggleMobileNavbar());
                            dispatch(BasketActionCreator.closeBasket());
                            event.stopPropagation();
                        }}
                    />

                    <h1 className={styles.logo}>
                        <Link href="/">
                            <a className={styles.logoLink}>
                                <img src={logoImg.src} alt="ScreenOn" className={styles.logoImage} />
                            </a>
                        </Link>
                    </h1>

                    <form
                        className={styles.inputBlock}
                        onSubmit={(event) => {
                            event.preventDefault();
                            location.assign("/catalog?find=" + findInputState);
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
                                    dispatch(MobileNavbarActionCreator.closeMobileNavbar());
                                    dispatch(BasketActionCreator.toggleBasket());
                                    event.stopPropagation();
                                }}
                            >
                                <FontAwesomeIcon icon={faShoppingCart} className={styles.basketIcon} />

                                <span className={styles.basketCounter}>
                                    {basketState.products.reduce((previous, current) => previous + current.count, 0)}
                                </span>
                            </div>

                            {basketState.isOpen ? (
                                <div className={styles.basketCard}>
                                    <Basket />
                                </div>
                            ) : null}
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
