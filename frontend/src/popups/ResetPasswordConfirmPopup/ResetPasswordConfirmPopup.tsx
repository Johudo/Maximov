import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { UserAPI } from "../../api/UserAPI";
import Button from "../../components/Button";
import FormError from "../../components/FormError";
import Input from "../../components/Input";
import Preloader from "../../components/Preloader";
import { PASSWORD_REGEXP_ERROR_MESSAGE, PASSWORD_REQUIRED_ERROR_MESSAGE } from "../../constants/errorMessages";
import { PASSWORD_PLACEHOLDER } from "../../constants/placeholders";
import { PASSWORD_REGEXP } from "../../constants/regexps";
import { PopupActionCreator } from "../../store/actionCreators/popupActionCreator";
import { PopupTypeEnum } from "../Popup/PopupTypeEnum";
import styles from "./ResetPasswordConfirmPopup.module.scss";

const defaultRegisterErrors = [
    {
        field: "new_password",
        serverMessage: "The password is too similar to the email.",
        type: "Password similar to eamil",
        message: "Пароль похож на email",
    },
    {
        field: "new_password",
        serverMessage: "The password is too similar to the first name.",
        type: "Password similar to firstname",
        message: "Пароль похож на имя",
    },
    {
        field: "new_password",
        serverMessage: "The password is too similar to the last name.",
        type: "Password similar to lastname",
        message: "Пароль похож на фамилию",
    },
    {
        field: "new_password",
        serverMessage: "This password is too common.",
        type: "Password is common",
        message: "Пароль слишком легкий",
    },
];

export default function ResetPasswordConfirmPopup() {
    const [preloaderShown, setPreloaderShown] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        // clearErrors,
    } = useForm();

    const dispatch = useDispatch();
    const router = useRouter();

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

    async function resetPasswordConfirm(data: { new_password: string }) {
        setPreloaderShown(true);

        const routerData = JSON.parse(router.query.resetPassword as string);

        const result = await UserAPI.resetPasswordConfirm({
            new_password: data.new_password,
            uid: routerData.uid as string,
            token: routerData.token as string,
        });

        if (result.status === 204) {
            dispatch(PopupActionCreator.openPopup(PopupTypeEnum.resetPasswordSuccessed));
            return;
        }

        if (result.status === 400 && setDefaultError(result.data)) {
            console.log(result);
            setError("form", {
                type: "Unknown data",
                message: "Неизвестная ошибка, попробуйте перезагрузить страницу",
            });
        }

        setPreloaderShown(false);
    }

    return (
        <>
            <h3>
                Восcтановление пароля
                <div className={preloaderShown ? styles.preloader : styles.preloaderHidden}>
                    <Preloader inline />
                </div>
            </h3>

            <form onSubmit={handleSubmit(resetPasswordConfirm)} className={styles.form}>
                <Input
                    type="password"
                    placeholder={PASSWORD_PLACEHOLDER}
                    {...register("new_password", {
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
                    error={errors.password}
                />

                <FormError errors={errors} keyValue={"login-popup__error__"} />

                <Button type="submit">Сохранить новый пароль</Button>
            </form>
        </>
    );
}
