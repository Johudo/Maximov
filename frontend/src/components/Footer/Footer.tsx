import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import logoImg from "../../../public/images/logo.png";
import { useDispatch } from "react-redux";
import styles from "./Footer.module.scss";
import Container from "../Container";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function Footer() {
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
