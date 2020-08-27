import { useState } from 'react';
import { Board, Submarine, HorizontalSubmarine, VerticalSubmarine, Point } from '../models/seaBattleBoard';

export function useSeaBattleBoardLogic(props: {
    isPlayingFirst: boolean,
    numberOfSubmarines: number
}): ISeaBattleBoardLogic {
    const {isPlayingFirst, numberOfSubmarines} = props;
    const [myBoard, setMyBoard] = useState(new Board(10, 10));
    const [enemyBoard, setEnemyBoard] = useState(new Board(10, 10));
    const board = {
        myBoard: myBoard, 
        enemyBoard: enemyBoard
    }
    const [submarinesCounter, setSubmarinesCounter] = useState(myBoard.submarines.size);
    const maxSubmarines = numberOfSubmarines;
    const [myTurn, setMyTurn] = useState(isPlayingFirst);
    const [IamReady, setIamReady] = useState(false);
    const [winner, setWinner] = useState<number | undefined>(undefined);

    function placeSubmarine(submarine: Submarine, row: number, column: number) {
        if (isPreGame()) {
            const isToolPlaced = myBoard.addSubmarine(submarine, row, column);
            if (isToolPlaced) {
                submarine.row = row;
                submarine.col = column;
                if (maxSubmarines === submarinesCounter + 1) {
                    setIamReady(true);
                }
                setSubmarinesCounter(submarinesCounter + 1);
            }
            return isToolPlaced;
        }            
        return false;
    }

    function play(x: number, y: number) {
        if (!isPreGame()) {
            const bombResult = myBoard.bomb([x, y]);
            let coords: Point[] = [];
            if (bombResult) {
                if (bombResult === 'X' || bombResult === '0') {
                    setMyTurn(true);
                } else {
                    setMyTurn(false);
                }
            }

            if (bombResult === 'X') {
                const cell = myBoard.cellAt([x,y]);
                const submarine = cell?.item as Submarine;
                coords = submarine.getCoordinates(submarine.row as number, submarine.col as number);
                checkAndSetWinner(myBoard, isPlayingFirst ? 1 : 0);
            }

            return {
                bombResult,
                coords
            };
        } else {
            return false;
        }
    }

    function isPreGame() {
        return submarinesCounter < maxSubmarines;
    }

    function getSubmarine(coords: Point[]) {
        if (coords.length <= 1) {
            return new HorizontalSubmarine(coords.length);   
        }

        const coordA = coords[0];
        const coordB = coords[1];

        if (coordA[0] === coordB[0]) {
            return new HorizontalSubmarine(coords.length);
        } else {
            return new VerticalSubmarine(coords.length);
        }
    }

    function enemyRespond(x: number, y: number, bombResult: string, coords: Point[]) {
        if (bombResult === 'X') {
            enemyBoard.removeSubmarine(coords);
            const submarine = getSubmarine(coords);
            enemyBoard.addSubmarine(submarine, coords[0][0], coords[0][1]);
            coords.forEach((coord: Point) => {
                enemyBoard.bomb(coord);
            });
            setMyTurn(false);
            checkAndSetWinner(enemyBoard, isPlayingFirst ? 0 : 1);
        } else if (bombResult === '/') {
            const submarine = new HorizontalSubmarine(1, true);
            enemyBoard.addSubmarine(submarine, x, y);
            enemyBoard.bomb([x, y]);
            submarine.sank = false;
            submarine.hide = true;
            setMyTurn(true);
        } else {
            enemyBoard.bomb([x, y]);
            setMyTurn(false);
        }
    }

    function checkAndSetWinner(board: Board, player: number) {
        let shipsSank = 0;
        board.submarines.forEach((submarine: Submarine) => {
            if (submarine.sank) {
                shipsSank++;
            }
        });
        if (shipsSank === maxSubmarines) {
            setWinner(player);
        }
    }

    return [board, placeSubmarine, play, myTurn, enemyRespond, IamReady, winner]
}

export type ISeaBattleBoardLogic = [
    {
        myBoard: Board, 
        enemyBoard: Board
    },
    (submarine: Submarine, row: number, column: number) => boolean,
    (x: number, y: number) => boolean | {bombResult: string | undefined, coords: Point[] | undefined},
    boolean,
    (x: number, y: number, bombResult: string, coords: Point[]) => void,
    boolean,
    number | undefined
]