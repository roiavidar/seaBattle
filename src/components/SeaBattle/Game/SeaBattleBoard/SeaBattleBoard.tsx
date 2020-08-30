import React from 'react';
import _ from 'lodash';
import { Board, Submarine } from '../../../../models/seaBattleBoard';
import { SubmarineModel } from '../submarine.model';
import { BoardSquare } from './BoardSquare';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function SeaBattleBoard(props: {
    board: Board,
    itemsType: string,
    play?: (x: number, y: number) => void,
    placeSubmarine: (submarine: Submarine, row: number, column: number) => boolean,
    submarines: SubmarineModel[],
    setSubmarines: (submarines: SubmarineModel[]) => void,
    onSubmarineDropped?: () => void
}) {
    const {board, itemsType, play, placeSubmarine, onSubmarineDropped, submarines} = props;

    return (
        <DndProvider backend={HTML5Backend}>
            <table>
                <tbody>
                {_.range(board.rowCount).map(rowIndex => (
                    <tr key={rowIndex}>
                        {_.range(board.columnCount).map((colIndex, index: number) => {
                            return <BoardSquare
                                        key={index}
                                        itemsType={itemsType}
                                        board={board}
                                        rowIndex={rowIndex}
                                        colIndex={colIndex}
                                        play={play}
                                        addSubmarine={placeSubmarine}
                                        submarineDropped={onSubmarineDropped}
                                        showSubmarines={submarines.length !== 0} />
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        </DndProvider>
    )
}