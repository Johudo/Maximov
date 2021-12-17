import React from "react";
import styles from "./Partners.module.scss";

import asusImage from "../../../public/images/partners/asus.webp";
import coolmasterImage from "../../../public/images/partners/coolmaster.webp";
import hpImage from "../../../public/images/partners/hp.webp";
import intelImage from "../../../public/images/partners/intel.jpg";
import lenovoImage from "../../../public/images/partners/lenovo.jpg";
import palitImage from "../../../public/images/partners/palit.webp";

const partners = [
    { image: asusImage, name: "asus" },
    { image: coolmasterImage, name: "coolmaster" },
    { image: hpImage, name: "hp" },
    { image: intelImage, name: "intel" },
    { image: lenovoImage, name: "lenovo" },
    { image: palitImage, name: "palit" },
];

export default function Partners() {
    return (
        <div className={styles.container}>
            {partners.map((item, index) => {
                return (
                    <div className={styles.imageWrapper} key={"partners-item-" + index}>
                        <img src={item.image.src} alt={item.name} key={"partners__" + index} className={styles.image} />
                    </div>
                );
            })}
        </div>
    );
}
