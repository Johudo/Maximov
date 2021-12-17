import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { UserAPI } from "../../api/UserAPI";
import Button from "../../components/Button";
import FormError from "../../components/FormError";
import Input from "../../components/Input";
import Preloader from "../../components/Preloader";
import { EMAIL_REGEXP_ERROR_MESSAGE, EMAIL_REQUIRED_ERROR_MESSAGE } from "../../constants/errorMessages";
import { EMAIL_PLACEHOLDER } from "../../constants/placeholders";
import { EMAIL_REGEXP } from "../../constants/regexps";
import { PopupActionCreator } from "../../store/actionCreators/popupActionCreator";
import { PopupTypeEnum } from "../Popup/PopupTypeEnum";
// import { resetPasswordByEmail } from "../../../api/apiUser";
import styles from "./ResetPasswordPopup.module.scss";

export default function ResetPasswordPopup() {
    const [preloaderShown, setPreloaderShown] = useState(false);

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        // clearErrors,
    } = useForm();

    async function resetPassword(data: { email: string }) {
        setPreloaderShown(true);

        const result = await UserAPI.resetPassword(data);
        console.log(result);

        if (result.status === 204) {
            dispatch(PopupActionCreator.openPopup(PopupTypeEnum.resetPasswordInfo));
            return;
        }

        setError("form", {
            type: "Unknown error",
            message: "Неизвестная ошибка. Перезагрузите страницу и попробуйте снова",
        });

        console.log(result);
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

            <form onSubmit={handleSubmit(resetPassword)} className={styles.form}>
                <Input
                    type="text"
                    placeholder={EMAIL_PLACEHOLDER}
                    {...register("email", {
                        required: EMAIL_REQUIRED_ERROR_MESSAGE,
                        pattern: {
                            value: EMAIL_REGEXP,
                            message: EMAIL_REGEXP_ERROR_MESSAGE,
                        },
                    })}
                    error={errors.email}
                />

                <FormError errors={errors} keyValue={"login-popup__error__"} />

                <Button type="submit">Восстановить пароль</Button>
            </form>
        </>
    );
}
