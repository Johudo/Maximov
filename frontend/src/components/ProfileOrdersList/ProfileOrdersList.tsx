import React from "react";
import ProfileOrder from "../ProfileOrder";
import styles from "./ProfileOrdersList.module.scss";
import firstImage from "../../../public/images/productSlideShow/pic1.jpg";

const product = {
    id: 3,
    title: "AMD Ryzen 3 3200G - Quad Core",
    description: "De AMD Ryzen 3 3200G is een uitstekende Quad Core processor die zeer geschikt is voor gaming.",
    picture: firstImage.src,
    price: "200.00",
    recommendation: false,
    types: 2,
    is_for_game: false,
    is_laptop: false,
    is_new: false,
    fps: 0,
    is_special: false,
};

const order = {
    id: 2156,
    date: "16.01.2021",
    status: "Ожидается оплата",
    totalPrice: 1870,
    track: "1223430946291",
    products: [product, product, product],
};

export default function ProfileOrdersList() {
    // const usersOrdersState = useSelector((state: IState) => state.user.orders);
    return (
        <div className={styles.ordersList}>
            {/* {usersOrdersState.map((item, index) => {
                return <ProfileOrder order={item} key={"users-order__" + index} />;
            })} */}
            {/* <ProfileOrder order={order} />
            <ProfileOrder order={order} />
            <ProfileOrder order={order} /> */}
        </div>
    );
}
