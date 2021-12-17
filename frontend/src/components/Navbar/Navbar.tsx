import React from "react";
import { useDispatch } from "react-redux";
import { MobileNavbarActionCreator } from "../../store/actionCreators/mobileNavbarActionCreator";
import Container from "../Container";
import styles from "./Navbar.module.scss";

const navList = [
    {
        text: "Каталог",
        url: "/catalog",
    },
];

export default function Navbar() {
    const dispatch = useDispatch();
    // const router = useRouter();

    return (
        <div className={styles.wrapper}>
            <Container>
                <nav>
                    <ul className={styles.list}>
                        {navList.map((item, index) => {
                            return (
                                <li
                                    key={"navbar-item-" + index}
                                    className={styles.item}
                                    // className={
                                    //     router.route === item.url || router.route === item.url + "/"
                                    //         ? styles.itemSelected
                                    //         : styles.item
                                    // }
                                    onClick={() => dispatch(MobileNavbarActionCreator.closeMobileNavbar())}
                                >
                                    <a href={item.url}>{item.text}</a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </Container>
        </div>
    );
}
