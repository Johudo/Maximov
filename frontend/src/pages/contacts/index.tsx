import { NextPage, NextPageContext } from "next";
import React from "react";
import Image from "next/image";
import PageWrapper from "../../components/PageWrapper";
import { IState, wrapper } from "../../store";
import { AuthStartUp } from "../../utils/AuthStartUp";
import { BasketStartUp } from "../../utils/BasketStartUp";
import styles from "../styles/pages/ContactsPage.module.scss";
import contactsImage from "../../public/images/contactsImage/contactsImage.jpg";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
    EMAIL_REGEXP_ERROR_MESSAGE,
    EMAIL_REQUIRED_ERROR_MESSAGE,
    FIRSTNAME_REGEXP_ERROR_MESSAGE,
    FIRSTNAME_REQUIRED_ERROR_MESSAGE,
    MESSAGE_REQUIRED_ERROR_MESSAGE,
    PHONE_REGEXP_ERROR_MESSAGE,
    PHONE_REQUIRED_ERROR_MESSAGE,
} from "../../constants/errorMessages";
import { EMAIL_REGEXP, FIRSTNAME_REGEXP, PHONE_REGEXP } from "../../constants/regexps";
import FormError from "../../components/FormError";
import { FeedbackAPI } from "../../api/FeedbackAPI";

const ContactsPage: NextPage<ContactsPageProps> = (props: ContactsPageProps) => {
    const userInfo = useSelector((state: IState) => state.user.userInfo);

    const {
        handleSubmit,
        register,
        formState: { errors },
        setError,
    } = useForm();

    async function onSubmit(data: { email: string; name: string; phone: string; message: string }) {
        const feedbackResult = await FeedbackAPI.createFeedback(data);

        if (feedbackResult.status === 201) {
            location.reload();
            return;
        }

        console.log(feedbackResult);
        setError("form", {
            type: "Unknown data",
            message: "Неизвестная ошибка. Попробуйте перезагрузить страницу!",
        });
    }

    return (
        <PageWrapper>
            <h1 className={styles.pageTitle}>Контакты</h1>

            <div className={styles.pageSubtitle}>
                <p>Посетите нас по адресу Noordvliet 215 в Леувардене.</p>
                <p>Звоните по телефону 058 2045 115 в рабочие дни с 10:00 до 17:00</p>
            </div>

            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2389.837164603581!2d5.806301915801428!3d53.20283647994912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c8fe890e5b5a1d%3A0x18739ad2060911f8!2zTm9vcmR2bGlldCAyMTUsIDg5MjEgR0cgTGVldXdhcmRlbiwg0J3QuNC00LXRgNC70LDQvdC00Ys!5e0!3m2!1sru!2sru!4v1616658611034!5m2!1sru!2sru"
                loading="lazy"
                className={styles.map}
            ></iframe>

            <div className={styles.formBlock}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <h4 className={styles.formTitle}>Остались вопросы? Отправьте нам сообщение!</h4>

                    <div>
                        <div className={styles.twoInputs}>
                            <Input
                                type="text"
                                className={styles.contactsInputWidth}
                                placeholder="Имя"
                                defaultValue={userInfo?.first_name || ""}
                                error={errors.name}
                                {...register("name", {
                                    required: FIRSTNAME_REQUIRED_ERROR_MESSAGE,
                                    pattern: {
                                        value: FIRSTNAME_REGEXP,
                                        message: FIRSTNAME_REGEXP_ERROR_MESSAGE,
                                    },
                                })}
                            />

                            <Input
                                type="text"
                                className={styles.contactsInputWidth}
                                placeholder="E-mail"
                                defaultValue={userInfo?.email || ""}
                                error={errors.email}
                                {...register("email", {
                                    required: EMAIL_REQUIRED_ERROR_MESSAGE,
                                    pattern: {
                                        value: EMAIL_REGEXP,
                                        message: EMAIL_REGEXP_ERROR_MESSAGE,
                                    },
                                })}
                            />
                        </div>

                        <Input
                            type="text"
                            className={styles.contactsInput}
                            placeholder="Номер телефона"
                            error={errors.phone}
                            {...register("phone", {
                                required: PHONE_REQUIRED_ERROR_MESSAGE,
                                pattern: {
                                    value: PHONE_REGEXP,
                                    message: PHONE_REGEXP_ERROR_MESSAGE,
                                },
                            })}
                        />

                        <Textarea
                            placeholder="Ваше сообщение"
                            cols={30}
                            rows={10}
                            className={styles.contactsInput}
                            error={errors.message}
                            {...register("message", {
                                required: MESSAGE_REQUIRED_ERROR_MESSAGE,
                            })}
                        ></Textarea>

                        <FormError errors={errors} keyValue={"contacts__errors__"} />

                        <Button type="submit" className={styles.submitButton}>
                            Отправить сообщение
                        </Button>
                    </div>
                </form>

                <div className={styles.formSidebar}>
                    <h4 className={styles.formTitle}>ScreenOn Narrowcasting</h4>
                    <img src={contactsImage.src} className={styles.formImg} alt="ScreenOn Narrowcasting" />
                </div>
            </div>
        </PageWrapper>
    );
};

ContactsPage.getInitialProps = wrapper.getInitialPageProps((store) => async (context: NextPageContext) => {
    await AuthStartUp(store, context);
    await BasketStartUp(store, context);

    return {} as ContactsPageProps;
});

type ContactsPageProps = {};

export default ContactsPage;
