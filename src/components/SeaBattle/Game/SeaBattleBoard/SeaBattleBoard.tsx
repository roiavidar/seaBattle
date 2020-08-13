import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import _ from 'lodash';
import { BoardSquare } from './BoardSquare';
import { Submarine } from '../../../../models/seaBattleBoard';
import BoardSubmarine from './Submarine';
import { Board } from '../../../submarines';
import { verticalSubmarine, horizontalSubmarine } from '../SubmarinesGameTools';

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
                                {_.range(board.columnCount).map(colIndex => {
                                    return <BoardSquare
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
                            submarines.map((submarine: any) => (
                                <BoardSubmarine itemsType={itemsType} {...submarine} src={submarine.vertical ? verticalSubmarine : horizontalSubmarine}  />  
                            ))
                        }
                    </div>
                </div>
            </DndProvider>
        </div>
    )
}