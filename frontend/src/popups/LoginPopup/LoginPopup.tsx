import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styles from "./LoginPopup.module.scss";
import { PopupTypeEnum } from "../Popup/PopupTypeEnum";
import { PopupActionCreator } from "../../store/actionCreators/popupActionCreator";
import Preloader from "../../components/Preloader";
import FormError from "../../components/FormError";
import { EMAIL_REGEXP, PASSWORD_REGEXP } from "../../constants/regexps";
import {
    EMAIL_REGEXP_ERROR_MESSAGE,
    EMAIL_REQUIRED_ERROR_MESSAGE,
    PASSWORD_REGEXP_ERROR_MESSAGE,
    PASSWORD_REQUIRED_ERROR_MESSAGE,
} from "../../constants/errorMessages";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { EMAIL_PLACEHOLDER, PASSWORD_PLACEHOLDER } from "../../constants/placeholders";
import Checkbox from "../../components/Checkbox";
import { AuthAPI } from "../../api/AuthAPI";

export default function LoginPopup() {
    const [preloaderShown, setPreloaderShown] = useState(false);
    const [rememberMeValue, setRememberMeValue] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm();

    const dispatch = useDispatch();

    const loginUser = async (data: { login: string; password: string }) => {
        setPreloaderShown(true);

        const result = await AuthAPI.login(data);
        console.log(result);

        if (result.status === 200) {
            location.reload();
            return;
        }

        if (result.status === 401) {
            setError("form", {
                type: "Unknown data",
                message: "Пользователя с таким email и паролем не существует или он не подтвержден по email",
            });
        }

        setPreloaderShown(false);
    };

    return (
        <>
            <h3>
                Вход
                <div className={preloaderShown ? styles.preloader : styles.preloaderHidden}>
                    <Preloader inline />
                </div>
            </h3>

            <form onSubmit={handleSubmit(loginUser)} onChange={() => clearErrors("form")} className={styles.form}>
                <Input
                    type="text"
                    placeholder={"Имя пользователя"}
                    {...register("login", {
                        required: "Имя пользователя - обязательное поле",
                    })}
                    className={styles.input}
                    error={errors.login}
                />

                <Input
                    type="password"
                    placeholder={PASSWORD_PLACEHOLDER}
                    {...register("password", {
                        required: PASSWORD_REQUIRED_ERROR_MESSAGE,
                        pattern: {
                            value: PASSWORD_REGEXP,
                            message: PASSWORD_REGEXP_ERROR_MESSAGE,
                        },
                    })}
                    className={styles.input}
                    error={errors.password}
                />

                <FormError errors={errors} keyValue={"login-popup__error__"} />

                <Button type="submit">Войти</Button>

                <Button
                    type="button"
                    className={styles.transparentButton}
                    onClick={() => dispatch(PopupActionCreator.openPopup(PopupTypeEnum.register))}
                >
                    Регистрация
                </Button>
            </form>
        </>
    );
}
