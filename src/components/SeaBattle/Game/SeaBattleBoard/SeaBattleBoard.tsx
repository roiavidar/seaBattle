import React from 'react';
import { ISeaBattleBoard } from './ISeaBattleBoard';
import { Submarine } from '../../../../models/seaBattleBoard';

export default function SeaBattleBoard(props: {
    board: ISeaBattleBoard,
    play?: (x: number, y: number) => void,
    placeSubmarine?: (submarine: Submarine, row: number, column: number) => boolean
}) {
    const {board} = props;

    return (
        <div>
            Sea Battle Board !
        </div>
    )
}