import styles from "./Popup.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store";
import { PopupTypeEnum } from "./PopupTypeEnum";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PopupActionCreator } from "../../store/actionCreators/popupActionCreator";

const LoginPopup = dynamic(() => import("../LoginPopup"));
const RegisterPopup = dynamic(() => import("../RegisterPopup"));
const ResetPasswordPopup = dynamic(() => import("../ResetPasswordPopup"));
const ResetPasswordConfirmPopup = dynamic(() => import("../ResetPasswordConfirmPopup"));
const InfoPopup = dynamic(() => import("../InfoPopup"));

const popupsList = [
    { type: PopupTypeEnum.login, component: LoginPopup },
    { type: PopupTypeEnum.register, component: RegisterPopup },
    { type: PopupTypeEnum.resetPassword, component: ResetPasswordPopup },
    { type: PopupTypeEnum.resetPasswordIConfirm, component: ResetPasswordConfirmPopup },
    {
        type: PopupTypeEnum.confirmEmailInfo,
        component: () => {
            const dispatch = useDispatch();
            return (
                <InfoPopup
                    title="Вы зарегистрированы"
                    description="Чтобы продолжить подтвердите свой Email и войдите в свой аккаунт"
                    buttonOnClick={() => dispatch(PopupActionCreator.openPopup(PopupTypeEnum.login))}
                />
            );
        },
    },
    {
        type: PopupTypeEnum.resetPasswordInfo,
        component: () => {
            const dispatch = useDispatch();
            return (
                <InfoPopup
                    title="Восстановление пароля"
                    description="Письмо с дальнейшими действиями для восстановления пароля отправленно на вашу почту!"
                    buttonOnClick={() => dispatch(PopupActionCreator.openPopup(PopupTypeEnum.login))}
                />
            );
        },
    },
    {
        type: PopupTypeEnum.resetPasswordSuccessed,
        component: () => {
            const dispatch = useDispatch();
            return (
                <InfoPopup
                    title="Восстановление пароля"
                    description="Новый пароль установлен!"
                    buttonOnClick={() => dispatch(PopupActionCreator.openPopup(PopupTypeEnum.login))}
                />
            );
        },
    },
];

export default function Popup() {
    const [lastPopupType, setLastPopupType] = useState<PopupTypeEnum>();
    const popupState = useSelector((state: IState) => state.popup);

    const dispatch = useDispatch();

    const closePopupOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        if (event.currentTarget === event.target) {
            dispatch(PopupActionCreator.closePopup());
        }
    };

    useEffect(() => {
        if (popupState.name) setLastPopupType(popupState.name);
    }, [popupState.name]);

    return (
        <div
            className={[styles.popupWrapper, popupState.isOpen ? undefined : styles.popupWrapper__closed]
                .join(" ")
                .trim()}
            onClick={closePopupOnClick}
        >
            <div className={styles.wrapperInner} onClick={closePopupOnClick}>
                <div className={styles.popup}>
                    <div className={styles.closeButton} onClick={() => dispatch(PopupActionCreator.closePopup())}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>

                    {popupsList.map((popup) =>
                        popup.type === lastPopupType ? (
                            <div className={styles.popupView} key={"popup-window__" + lastPopupType}>
                                <popup.component />
                            </div>
                        ) : null
                    )}
                </div>
            </div>
        </div>
    );
}