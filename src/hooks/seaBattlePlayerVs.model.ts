import { SubmarineModel } from "../components/SeaBattle/Game/submarine.model";
import { Board, Submarine } from "../models/seaBattleBoard";

export type ISeaBattlePlayerVsAI = [
    number | undefined,
    () => string,
    () => string,
    SubmarineModel[],
    (submarines: SubmarineModel[]) => void,
    {
        myBoard: Board,
        enemyBoard: Board
    },
    (x: number, y: number) => void,
    (submarine: Submarine, row: number, column: number) => boolean,
    SubmarineModel[]
]

export type ISeaBattlePlayerVsPlayer = [
    number | undefined,
    () => string,
    () => string,
    SubmarineModel[],
    (submarines: SubmarineModel[]) => void,
    {
        myBoard: Board,
        enemyBoard: Board
    },
    (submarine: Submarine, row: number, column: number) => boolean,
    (x: number, y: number) => void,
    SubmarineModel[]
]