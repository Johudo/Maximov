import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AuthAPI } from "../../api/AuthAPI";
import Button from "../../components/Button";
import FormErrorsBlock from "../../components/FormErrorsBlock";
import Input from "../../components/Input";
import Preloader from "../../components/Preloader";
import {
    EMAIL_REGEXP_ERROR_MESSAGE,
    EMAIL_REQUIRED_ERROR_MESSAGE,
    FIRSTNAME_REGEXP_ERROR_MESSAGE,
    FIRSTNAME_REQUIRED_ERROR_MESSAGE,
    PASSWORD_REGEXP_ERROR_MESSAGE,
    PASSWORD_REQUIRED_ERROR_MESSAGE,
    SECONDNAME_REGEXP_ERROR_MESSAGE,
    SECONDNAME_REQUIRED_ERROR_MESSAGE,
} from "../../constants/errorMessages";
import {
    EMAIL_PLACEHOLDER,
    FIRSTNAME_PLACEHOLDER,
    PASSWORD_PLACEHOLDER,
    REPEAT_PASSWORD_PLACEHOLDER,
    SECONDNAME_PLACEHOLDER,
} from "../../constants/placeholders";
import { EMAIL_REGEXP, FIRSTNAME_REGEXP, PASSWORD_REGEXP, SECONDNAME_REGEXP } from "../../constants/regexps";
import { PopupActionCreator } from "../../store/actionCreators/popupActionCreator";
import { PopupTypeEnum } from "../Popup/PopupTypeEnum";
// import { createUserQuery } from "../../../api/apiUser";
import styles from "./RegisterPopup.module.scss";

const defaultRegisterErrors = [
    {
        field: "email",
        serverMessage: "account with this email already exists.",
        type: "Email exists",
        message: "Пользователя с таким email уже существует",
    },
    {
        field: "password",
        serverMessage: "The password is too similar to the email.",
        type: "Password similar to eamil",
        message: "Пароль похож на email",
    },
    {
        field: "password",
        serverMessage: "The password is too similar to the first name.",
        type: "Password similar to firstname",
        message: "Пароль похож на имя",
    },
    {
        field: "password",
        serverMessage: "The password is too similar to the last name.",
        type: "Password similar to lastname",
        message: "Пароль похож на фамилию",
    },
    {
        field: "password",
        serverMessage: "This password is too common.",
        type: "Password is common",
        message: "Пароль слишком легкий",
    },
];

export default function RegisterPopup() {
    const [preloaderShown, setPreloaderShown] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm();

    const dispatch = useDispatch();

    const setDefaultError = (data: any): boolean => {
        let isUnknownError = true;

        defaultRegisterErrors.forEach((error) => {
            if (
                error.field === Object.entries(data)[0][0] &&
                error.serverMessage === (Object.entries(data)[0][1] as Array<string>)[0]
            ) {
                setError(error.field, {
                    type: error.type,
                    message: error.message,
                });
                isUnknownError = false;
            }
        });

        if (isUnknownError)
            setError(Object.entries(data)[0][0], {
                type: (Object.entries(data)[0][1] as Array<string>)[0],
                message: (Object.entries(data)[0][1] as Array<string>)[0],
            });

        return isUnknownError;
    };

    const registerUser = async (data: {
        login: string;
        first_name: string;
        last_name: string;
        email: string;
        password: string;
        confirmPassword: string;
    }) => {
        setPreloaderShown(true);

        if (data.password !== data.confirmPassword) {
            setError("equalPasswords", { message: "Пароли не совпадают" });
            setPreloaderShown(false);
            return;
        }

        const result = await AuthAPI.register({
            login: data.login,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
            re_password: data.confirmPassword,
        });

        if (result.status === 201) {
            dispatch(PopupActionCreator.openPopup(PopupTypeEnum.confirmEmailInfo));
        } else if (result.status === 400 && setDefaultError(result.data)) {
            console.log(result);
            setError("form", {
                type: "Unknown data",
                message: "Неизвестная ошибка, попробуйте перезагрузить страницу",
            });
        } else console.log(result);

        setPreloaderShown(false);
    };

    return (
        <>
            <h3>
                Регистрация
                <div className={preloaderShown ? styles.preloader : styles.preloaderHidden}>
                    <Preloader inline />
                </div>
            </h3>

            <form
                onSubmit={handleSubmit(registerUser)}
                onChange={() => clearErrors(["equalPasswords"])}
                className={styles.form}
            >
                <Input
                    type="text"
                    placeholder={"Имя пользователя"}
                    error={errors.login}
                    {...register("login", {
                        required: "Имя пользователя - обязательное поле",
                    })}
                />

                <Input
                    type="text"
                    placeholder={EMAIL_PLACEHOLDER}
                    error={errors.email}
                    {...register("email", {
                        required: EMAIL_REQUIRED_ERROR_MESSAGE,
                        pattern: {
                            value: EMAIL_REGEXP,
                            message: EMAIL_REGEXP_ERROR_MESSAGE,
                        },
                    })}
                />

                <Input
                    type="text"
                    placeholder={FIRSTNAME_PLACEHOLDER}
                    error={errors.first_name}
                    {...register("first_name", {
                        required: FIRSTNAME_REQUIRED_ERROR_MESSAGE,
                        pattern: {
                            value: FIRSTNAME_REGEXP,
                            message: FIRSTNAME_REGEXP_ERROR_MESSAGE,
                        },
                    })}
                />

                <Input
                    type="text"
                    placeholder={SECONDNAME_PLACEHOLDER}
                    error={errors.last_name}
                    {...register("last_name", {
                        required: SECONDNAME_REQUIRED_ERROR_MESSAGE,
                        pattern: {
                            value: SECONDNAME_REGEXP,
                            message: SECONDNAME_REGEXP_ERROR_MESSAGE,
                        },
                    })}
                />

                <Input
                    type="password"
                    placeholder={PASSWORD_PLACEHOLDER}
                    error={errors.password}
                    {...register("password", {
                        required: PASSWORD_REQUIRED_ERROR_MESSAGE,
                        minLength: {
                            value: 8,
                            message: "Пароль должен состоять минимум из 8 символов",
                        },
                        pattern: {
                            value: PASSWORD_REGEXP,
                            message: PASSWORD_REGEXP_ERROR_MESSAGE,
                        },
                    })}
                />

                <Input
                    type="password"
                    placeholder={REPEAT_PASSWORD_PLACEHOLDER}
                    error={errors.confirmPassword}
                    {...register("confirmPassword")}
                />

                <FormErrorsBlock errors={errors} />

                <Button type="submit">Зарегистрироваться</Button>

                <Button
                    type="button"
                    className={styles.transparentButton}
                    onClick={() => dispatch(PopupActionCreator.openPopup(PopupTypeEnum.login))}
                >
                    Уже есть аккаунт
                </Button>
            </form>
        </>
    );
}
