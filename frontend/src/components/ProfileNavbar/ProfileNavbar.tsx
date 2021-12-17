import Cookies from "js-cookie";
import { useRouter } from "next/dist/client/router";
import React from "react";
import styles from "./ProfileNavbar.module.scss";

const navbarList = [
    {
        text: "Профиль",
        page: "/profile",
    },
    {
        text: "Мои заказы",
        page: "/profile/orders",
    },
];

export default function ProfileNavbar() {
    function logOut() {
        Cookies.remove("access");
        Cookies.remove("refresh");
        location.replace("/");
    }

    const router = useRouter();

    return (
        <ul className={styles.list}>
            {navbarList.map((item, index) => {
                return (
                    <li
                        key={"profile-list__item__" + index}
                        className={router.route === item.page ? styles.selectedItem : styles.item}
                    >
                        <a href={item.page} className={styles.itemLink}>
                            {item.text}
                        </a>
                    </li>
                );
            })}

            <li className={styles.item}>
                <button className={styles.itemLink} onClick={logOut}>
                    Выйти
                </button>
            </li>
        </ul>
    );
}
