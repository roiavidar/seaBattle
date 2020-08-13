import { useRef, useState } from 'react';
import { Board, Submarine, HorizontalSubmarine } from '../models/seaBattleBoard';

export function useSeaBattleBoardLogic(props: {
    isPlayingFirst: boolean
}): ISeaBattleBoardLogic {
    const {isPlayingFirst} = props;
    const myBoard = useRef(new Board(10, 10)).current;
    const enemyBoard = useRef(new Board(10, 10)).current;
    const board = {
        myBoard: myBoard, 
        enemyBoard: enemyBoard
    }
    const [submarinesCounter, setSubmarinesCounter] = useState(0);
    const maxSubmarines = 6;
    const [myTurn, setMyTurn] = useState(isPlayingFirst);

    function placeSubmarine(submarine: Submarine, row: number, column: number) {
        if (isPreGame()) {
            try {
                myBoard.addSubmarine(submarine, row, column);
                setSubmarinesCounter(submarinesCounter + 1);
                return true;
            } catch {
                return false;
            }
        } else {
            return false;
        }
    }

    function play(x: number, y: number) {
        if (!isPreGame()) {
            const bombResult = myBoard.bomb([x, y]);
            if (bombResult === 'X' || bombResult === '0') {
                setMyTurn(false);
            }
            return bombResult;
        } else {
            return false;
        }
    }

    function isPreGame() {
        return submarinesCounter < maxSubmarines;
    }

    function enemyTurn(x: number, y: number, result: string) {
        if (result === '/' || result === 'X') {
            const submarine = new HorizontalSubmarine(1);
            enemyBoard.addSubmarine(submarine, x, y);
        }

        const bombResult = enemyBoard.bomb([x, y]);

        if (bombResult === '/') {
            setMyTurn(false);
        } else {
            setMyTurn(true);
        }
    }

    return [board, placeSubmarine, play, myTurn, enemyTurn]
}

export type ISeaBattleBoardLogic = [
    {
        myBoard: Board, 
        enemyBoard: Board
    },
    (submarine: Submarine, row: number, column: number) => boolean,
    (x: number, y: number) => boolean | string | undefined,
    boolean,
    (x: number, y: number, result: string) => void
]