import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import logoImg from "../../../public/images/logo.png";
import { useDispatch } from "react-redux";
import styles from "./Footer.module.scss";
import Container from "../Container";
import Button from "../Button";
import Input from "../Input";
import { BasketActionCreator } from "../../store/actionCreators/basketActionCreator";
import { useForm } from "react-hook-form";
import { EMAIL_REGEXP_ERROR_MESSAGE, EMAIL_REQUIRED_ERROR_MESSAGE } from "../../constants/errorMessages";
import { EMAIL_REGEXP } from "../../constants/regexps";
import FormError from "../FormError";
import { EmailNewsAPI } from "../../api/EmailNewsAPI";
import Link from "next/link";

const navList = [
    {
        text: "Каталог",
        url: "/catalog",
    },
    {
        text: "Игровые компьютеры",
        url: "/catalog?catalog=desktops",
    },
    {
        text: "Ноутбуки",
        url: "/catalog?catalog=laptops",
    },
    {
        text: "Новинки",
        url: "/catalog?catalog=news",
    },
    {
        text: "Подбор онлайн",
        url: "/quiz",
    },
    {
        text: "Помощь",
        url: "/support",
    },
    {
        text: "Контакты",
        url: "/contacts",
    },
];

export default function Footer() {
    const dispatch = useDispatch();

    const {
        handleSubmit,
        register,
        formState: { errors },
        setError,
    } = useForm();

    async function subscribeNews(data: { email: string }) {
        const emailNewsResult = await EmailNewsAPI.subscribe(data);

        if (emailNewsResult.status === 201) {
            location.reload();
            return;
        }

        console.log(emailNewsResult);
        setError("form", {
            type: "Unknown data",
            message: "Неизвестная ошибка. Попробуйте перезагрузить страницу!",
        });
    }

    return (
        <footer className={styles.background}>
            <Container className={styles.upperContainer}>
                <Link href="/">
                    <a className={styles.logo}>
                        <img src={logoImg.src} alt="ScreenOn" />
                    </a>
                </Link>

                <div className={styles.contactsBlock}>
                    <Link href="tel:+71111111111">
                        <a className={styles.iconWithText}>
                            <FontAwesomeIcon icon={faPhone} />
                            +7(111) 111-11-11
                        </a>
                    </Link>
                    <Link href="mailto:example@mai.ru">
                        <a className={styles.iconWithText}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            example@mai.ru
                        </a>
                    </Link>
                </div>
            </Container>

            <Container className={styles.lowerContainer}>
                <span>{new Date().getFullYear()} МАИ</span>
            </Container>
        </footer>
    );
}
