import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames";

import styles from './game-styles.module.css';
import { emptyBoard, findWiner, isBoardFilled } from "../utils/board-utils";
import { getBoardSizeSelector, getGameModeSelector, getFirstPlayerSelector, getSecondPlayerSelector } from "../../store/selectors/game-settings.selectors";
import { BoardComponent } from "./BoardComponent";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { FieldValue, resetWiner, updateWiner } from "../../store/game.slice";
import { ButtonTypesEnum, ButtonUI } from "../ui/button.ui";
import { GameMode } from "../../store/game-settings.slice";
import { getCurrentValueSelector } from "../../store/selectors/game.selectors";

import victorySound from '../../assets/victory.mp3';
import gameOverSound from '../../assets/game-over.mp3';
import { useAudio } from "../../hooks/useAudio.hook";

export const GameComponent: React.FC = () => {
  const boardSize = useAppSelector(getBoardSizeSelector);
  const gameMode = useAppSelector(getGameModeSelector);
  const firstPlayer = useAppSelector(getFirstPlayerSelector);
  const secondPlayer = useAppSelector(getSecondPlayerSelector);

  const victoryAudio = useAudio(victorySound, {});
  const gameOverAudio = useAudio(gameOverSound, {});

  const currentValue = useAppSelector(getCurrentValueSelector);

  const boardRef = useRef<HTMLTableSectionElement>(null);

  const [board, setBoard] = useState<FieldValue[][]>(emptyBoard(boardSize))
  const [gameOver, setGameOver] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const resetGame = useCallback(() => {
    setBoard(emptyBoard(boardSize));
    dispatch(resetWiner());
    setGameOver(false);
  }, [boardSize, dispatch]);

  const botTurn = useCallback(() => {
    if (boardRef.current && !gameOver) {
      const childrens = boardRef.current.querySelectorAll(`[data-field-value=${FieldValue.NULL}]`);
      
      if (childrens.length) {
        const step = Math.floor(Math.random() * childrens.length);
        setTimeout(() => {
          (childrens[step] as HTMLElement).click();
        }, 200)
      }
    }
  }, [boardRef, gameOver]);

  useEffect(() => {
    if (gameMode === GameMode.BOT && currentValue === secondPlayer.fieldValue) {
      botTurn();
    }
  }, [gameMode, botTurn, currentValue, secondPlayer]);


  useEffect(() => {
    resetGame();
  }, [gameMode, boardSize, resetGame]);

  useLayoutEffect(() => {
    const winer = findWiner(board);

    if (winer) {
      dispatch(updateWiner({ winer }))
      setGameOver(true);
      victoryAudio.play();
    }

    if (!winer && isBoardFilled(board)) {
      setGameOver(true);
      gameOverAudio.play();
    }
  }, [board, boardSize, dispatch, gameOverAudio, victoryAudio]);

  return (
    <div className={styles.wrapper}>
      <BoardComponent ref={boardRef} currentValue={currentValue} board={board} setBoard={setBoard} gameOver={gameOver} />

      <div>
        {gameOver ?
          <ButtonUI style={ButtonTypesEnum.SUCCESS} label="New Game" handleClick={resetGame} />
          : <div className={styles.players}>
              {[firstPlayer, secondPlayer].map(player => 
                <div key={player.type} className={classNames(styles.playerInfo, { [styles.playerInfoActive]: currentValue === player.fieldValue })}>
                  <p className={styles.playerType}>{player.type}</p>
                  <p className={styles.playerValue}>{player.fieldValue}</p>
                </div>
              )}
            </div>
        }
      </div>
    </div>
  )
}