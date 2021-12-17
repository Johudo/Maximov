import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import styles from "./ProfileOrder.module.scss";
import { Order } from "../../types/Order";
import ProfileProductCard from "../ProfileProductCard";

export default function ProfileOrder(props: ProfileOrderProps) {
    const [isInfoShownState, setIsInfoShownState] = useState(false);

    function toggleOrderInfo() {
        setIsInfoShownState(!isInfoShownState);
    }

    return (
        <div className={styles.item}>
            <div className={styles.order}>
                <div className={styles.orderHeader}>
                    <div className={styles.orderId}>{"№" + props.order.id}</div>
                    <div className={styles.orderDate}>{props.order.date}</div>
                    <div className={styles.orderStatus}>{props.order.status}</div>
                    <div className={styles.orderPrice}>{"₽ " + props.order.totalPrice}</div>
                    <button className={styles.toggleOrderButton} onClick={toggleOrderInfo}>
                        {isInfoShownState ? "Свернуть" : "Показать"}
                    </button>
                </div>

                {isInfoShownState ? (
                    <div className={styles.orderInfo}>
                        <div className={styles.ordersList}>
                            {props.order.products.map((product, index) => (
                                <ProfileProductCard
                                    product={product}
                                    key={`Profile_orders_${props.order.id}_${index}`}
                                />
                            ))}
                        </div>
                        <div className={styles.trackInfo}>
                            Трек-номер: <span>{props.order.track}</span>
                        </div>
                    </div>
                ) : null}
            </div>

            <FontAwesomeIcon icon={faRedo} className={styles.reuseOrder} />
        </div>
    );
}

type ProfileOrderProps = { order: Order };
