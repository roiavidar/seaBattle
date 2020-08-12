import { Submarine, BoardSquare } from "../../../../models/seaBattleBoard";

export interface ISeaBattleBoard {
    board: Map<string, BoardSquare>,
    submarines?: Submarine[]
}