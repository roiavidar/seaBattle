import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import _ from 'lodash';
import { BoardSquare } from './BoardSquare';
import { Submarine, Board } from '../../../../models/seaBattleBoard';
import BoardSubmarine from './Submarine';
import { SubmarineModel } from '../SubmarinesGameTools';

export default function SeaBattleBoard(props: {
    board: Board,
    play?: (x: number, y: number) => void,
    placeSubmarine?: (submarine: Submarine, row: number, column: number) => boolean,
    submarines?: any,
    itemsType?: string
}) {
    const {board, submarines=[], itemsType=''} = props;

    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <div>
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
                                                colIndex={colIndex} />
                                })}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div>
                        {
                            submarines.map((submarine: SubmarineModel) => (
                                    <BoardSubmarine key={submarine.id} itemsType={itemsType} submarine={submarine}  />  
                                ))
                        }
                    </div>
                </div>
            </DndProvider>
        </div>
    )
}