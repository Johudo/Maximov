import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "./QuizGames.module.scss";
import firstImage from "../../../public/images/games/quizGame1.png";
import secondImage from "../../../public/images/games/quizGame2.png";
import thImage from "../../../public/images/games/quizGame3.png";
import fourthImage from "../../../public/images/games/quizGame4.png";
import fifthImage from "../../../public/images/games/quizGame5.png";
import sixthImage from "../../../public/images/games/quizGame6.png";
import sevImage from "../../../public/images/games/quizGame7.png";
import eiImage from "../../../public/images/games/quizGame8.png";
import Button from "../Button";

const gamesList = [
    {
        name: "1",
        image: firstImage.src,
        selected: false,
    },
    {
        name: "2",
        image: secondImage.src,
        selected: false,
    },
    {
        name: "3",
        image: thImage.src,
        selected: false,
    },
    {
        name: "4",
        image: fourthImage.src,
        selected: false,
    },
    {
        name: "5",
        image: fifthImage.src,
        selected: false,
    },
    {
        name: "6",
        image: sixthImage.src,
        selected: false,
    },
    {
        name: "7",
        image: sevImage.src,
        selected: false,
    },
    {
        name: "8",
        image: eiImage.src,
        selected: false,
    },
];

export default function QuizGames(props: QuizGamesProps) {
    const [hdSelectedState, setHdSelectedState] = useState(1080);
    const [gamesListState, setGamesListState] = useState(gamesList);

    return (
        <div className={styles.quizGames}>
            <div className={styles.screenSizeBlock}>
                <Button
                    className={hdSelectedState === 1080 ? styles.screenSizeButtonActive : styles.screenSizeButton}
                    onClick={() => setHdSelectedState(1080)}
                >
                    1080P
                </Button>
                <Button
                    className={hdSelectedState === 1440 ? styles.screenSizeButtonActive : styles.screenSizeButton}
                    onClick={() => setHdSelectedState(1440)}
                >
                    1440P
                </Button>
            </div>

            <div className={styles.gamesBlock}>
                {gamesListState.map((game, index) => {
                    return (
                        <div className={styles.imageBlock} key={"quiz__game__item__" + index}>
                            <img
                                src={game.image}
                                alt={game.name}
                                className={styles.gameImage}
                                onClick={() =>
                                    setGamesListState(
                                        gamesListState.map((gamesListStateItem, gamesListStateIndex) => {
                                            if (gamesListStateIndex === index)
                                                return {
                                                    ...game,
                                                    selected: !game.selected,
                                                };
                                            else return gamesListStateItem;
                                        })
                                    )
                                }
                            />

                            {game.selected ? (
                                <div
                                    className={styles.gameSelectedBlock}
                                    onClick={() =>
                                        setGamesListState(
                                            gamesListState.map((gamesListStateItem, gamesListStateIndex) => {
                                                if (gamesListStateIndex === index)
                                                    return {
                                                        ...game,
                                                        selected: !game.selected,
                                                    };
                                                else return gamesListStateItem;
                                            })
                                        )
                                    }
                                >
                                    <div className={styles.selectedIconWrapper}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    );
                })}
            </div>

            <div className={styles.managePagesBlock}>
                <Button className={styles.nextPageButton} onClick={() => props.toNextPage()}>
                    Далее
                </Button>
            </div>
        </div>
    );
}

type QuizGamesProps = {
    toPrevPage: () => void;
    toNextPage: () => void;
};
