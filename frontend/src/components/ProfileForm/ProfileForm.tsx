import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { UserAPI } from "../../api/UserAPI";
import { IState } from "../../store";
import Button from "../Button";
import FormErrorsBlock from "../FormErrorsBlock";
import Input from "../Input";
import styles from "./ProfileForm.module.scss";

export default function ProfileForm() {
    const userInfoState = useSelector((state: IState) => state.user.userInfo);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function correctUser(data: {
        login: string;
        firstName: string;
        lastName: string;
        email: string;
        birthday: string;
        phone: string;
    }) {
        const newData = {
            login: data.login,
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            birthday: data.birthday,
            phone: data.phone,
        };

        const result = await UserAPI.updateCurrentUserInfo(newData);

        if (result.status === 200) {
            location.reload();
            return;
        }

        console.log(result);
        alert("Ошибка");
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(correctUser)}>
            <div>
                <label htmlFor="login">Имя пользователя</label>
                <Input
                    type="text"
                    defaultValue={userInfoState?.login || ""}
                    className={errors.login ? styles.errorInput : styles.input}
                    error={errors.login}
                    {...register("login", {
                        pattern: {
                            value: /^[a-zA-Z0-1]+$/,
                            message: "Некорректный имя пользователя (Используйте латинские символы и цифры)",
                        },
                    })}
                />
            </div>

            <div>
                <label htmlFor="firstName">Имя</label>
                <Input
                    type="text"
                    defaultValue={userInfoState?.first_name || ""}
                    className={errors.firstName ? styles.errorInput : styles.input}
                    error={errors.firstName}
                    {...register("firstName", {
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
                    error={errors.lastName}
                    {...register("lastName", {
                        pattern: {
                            value: /^[a-zA-Zа-яА-Я ]+$/,
                            message: "Некорректная фамилия (Используйте русские или латинские символы и пробел)",
                        },
                    })}
                />
            </div>

            <div>
                <label htmlFor="email">E-mail</label>
                <Input
                    type="text"
                    defaultValue={userInfoState?.email || ""}
                    className={errors.email ? styles.errorInput : styles.input}
                    error={errors.email}
                    {...register("email", {})}
                />
            </div>

            <div>
                <label htmlFor="birthday">Дата рождения</label>
                <Input
                    type="date"
                    defaultValue={userInfoState?.birthday || ""}
                    className={errors.birthday ? styles.errorInput : styles.input}
                    error={errors.birthday}
                    {...register("birthday")}
                />
            </div>

            <div>
                <label htmlFor="phone">Номер телефона</label>
                <Input
                    type="text"
                    defaultValue={userInfoState?.phone || ""}
                    className={errors.phone ? styles.errorInput : styles.input}
                    error={errors.phone}
                    {...register("phone", {
                        pattern: {
                            value: /^(\+7)?[0-9]{10}$/,
                            message: "Некорректный номер телефона (пример: +79999999999)",
                        },
                    })}
                />
            </div>

            <FormErrorsBlock errors={errors} />

            <Button type="submit" className={styles.button}>
                СОХРАНИТЬ
            </Button>
        </form>
    );
}
