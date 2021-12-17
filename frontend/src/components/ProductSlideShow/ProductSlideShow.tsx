import React, { useState } from "react";
import styles from "./ProductSlideShow.module.scss";

export default function ProductSlideShow(props: ProductSlideShowProps) {
    const [selectedImageState, setSelectedImageState] = useState(0);

    return (
        <div className={styles.slideShow}>
            <ul className={styles.slideList}>
                {Array.isArray(props.images)
                    ? props.images.map((elem, index) => {
                          return (
                              <li className={styles.slideItemBlock} key={"product-slideshow__item__" + index}>
                                  <div className={styles.slideItem}>
                                      <button
                                          className={styles.imageWrapper}
                                          onClick={() => setSelectedImageState(index)}
                                      >
                                          <img src={elem} className={styles.image} alt={`Image ${index}`} />
                                      </button>
                                  </div>
                              </li>
                          );
                      })
                    : null}
            </ul>

            <div className={styles.mainImageBlock}>
                <div className={styles.mainImage}>
                    <div className={styles.imageWrapper}>
                        <img src={props.images[selectedImageState]} className={styles.image} alt="Main image" />
                    </div>
                </div>
            </div>
        </div>
    );
}

type ProductSlideShowProps = {
    images: Array<string>;
};
