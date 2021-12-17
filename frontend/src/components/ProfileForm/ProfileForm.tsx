import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { UserAPI } from "../../api/UserAPI";
import { PASSWORD_REGEXP_ERROR_MESSAGE } from "../../constants/errorMessages";
import { PASSWORD_REGEXP } from "../../constants/regexps";
import { IState } from "../../store";
import Button from "../Button";
import FormError from "../FormError";
import Input from "../Input";
import styles from "./ProfileForm.module.scss";

const defaultRegisterErrors = [
    {
        field: "current_password",
        serverMessage: "Invalid password.",
        type: "Invalid password",
        message: "Не правильный пароль",
    },
];

export default function ProfileForm() {
    const userInfoState = useSelector((state: IState) => state.user.userInfo);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
        setValue,
    } = useForm();

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

    async function updatePassword(
        current_password: string,
        new_password: string,
        re_new_password: string
    ): Promise<boolean> {
        const resetPasswordResult = await UserAPI.setNewPassword({
            current_password,
            new_password,
            re_new_password,
        });

        if (resetPasswordResult.status === 200) return true;

        console.log(resetPasswordResult);
        setDefaultError(resetPasswordResult.data);
        return false;
    }

    async function updateEmail(new_email: string, current_password: string): Promise<boolean> {
        const resetEmailResult = await UserAPI.setNewEmail({ new_email, current_password });

        if (resetEmailResult.status === 200) return true;

        console.log(resetEmailResult);
        setDefaultError(resetEmailResult.data);
        return false;
    }

    async function updateUserInfo(first_name: string, last_name: string): Promise<boolean> {
        const updateInfoResult = await UserAPI.updateCurrentUserInfo({ first_name, last_name });

        if (updateInfoResult.status === 200) return true;

        console.log(updateInfoResult);
        setDefaultError(updateInfoResult.data);
        return false;
    }

    async function correctUser(data: {
        firstName: string;
        lastName: string;
        new_email: string;
        current_password: string;
        new_password: string;
        re_new_password: string;
    }) {
        let isUpdateSuccessful = true;

        if (data.new_password) {
            isUpdateSuccessful = await updatePassword(data.current_password, data.new_password, data.re_new_password);
        }

        if (data.new_email !== userInfoState?.email) {
            isUpdateSuccessful = await updateEmail(data.new_email, data.current_password);
        }

        if (data.firstName !== userInfoState?.first_name || data.lastName !== userInfoState?.last_name) {
            isUpdateSuccessful = await updateUserInfo(data.firstName, data.lastName);
        }

        if (isUpdateSuccessful) location.reload();
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(correctUser)}>
            <div className={styles.nameBlock}>
                <div>
                    <label htmlFor="firstName">Имя</label>
                    <Input
                        type="text"
                        defaultValue={userInfoState?.first_name || ""}
                        className={errors.firstName ? styles.errorInput : styles.input}
                        {...register("firstName", {
                            required: "Имя - обязательное поле",
                            pattern: {
                                value: /^[a-zA-Zа-яА-Я ]+$/,
                                message: "Некорректный имя (Используйте русские или латинские символы и пробел)",
                            },
                        })}
                    />
                </div>

                <div>
                    <label htmlFor="lastName">Фамилия</label>
                    <Input
                        type="text"
                        defaultValue={userInfoState?.last_name || ""}
                        className={errors.lastName ? styles.errorInput : styles.input}
                        {...register("lastName", {
                            required: "Фамилия - обязательное поле",
                            pattern: {
                                value: /^[a-zA-Zа-яА-Я ]+$/,
                                message: "Некорректная фамилия (Используйте русские или латинские символы и пробел)",
                            },
                        })}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="new_email">E-mail</label>
                <Input
                    type="text"
                    defaultValue={userInfoState?.email || ""}
                    className={errors.new_email ? styles.errorInput : styles.input}
                    {...register("new_email", {
                        required: "Email - обязательное поле",
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Некорректный Email (пример: test@test.com)",
                        },
                    })}
                />
            </div>

            <div>
                <label htmlFor="current_password">Действующий пароль</label>
                <Input
                    type="password"
                    autoComplete="new-password"
                    className={errors.current_password ? styles.errorInput : styles.input}
                    {...register("current_password", {
                        required: "Действующий пароль - обязательное поле",
                        // minLength: {
                        //     value: 8,
                        //     message:
                        //         "Пароль должен состоять минимум из 8 символов",
                        // },
                        pattern: {
                            value: PASSWORD_REGEXP,
                            message: PASSWORD_REGEXP_ERROR_MESSAGE,
                        },
                    })}
                />
            </div>

            <div className={styles.changePasswordBlock}>
                <h3 className={styles.changePasswordTitle}>Смена пароля</h3>

                <div>
                    <label htmlFor="new_password">Новый пароль (не заполняйте, чтобы оставить прежний)</label>
                    <Input
                        type="password"
                        className={errors.new_password ? styles.errorInput : styles.input}
                        {...register("new_password", {
                            pattern: {
                                value: PASSWORD_REGEXP,
                                message: PASSWORD_REGEXP_ERROR_MESSAGE,
                            },
                        })}
                    />
                </div>

                <div>
                    <label htmlFor="re_new_password">Подтвердите новый пароль</label>
                    <Input
                        type="password"
                        className={errors.re_new_password ? styles.errorInput : styles.input}
                        {...register("re_new_password")}
                    />
                </div>
            </div>

            <FormError errors={errors} keyValue="correct-account__form__" />

            <Button type="submit" className={styles.button}>
                СОХРАНИТЬ
            </Button>
        </form>
    );
}
