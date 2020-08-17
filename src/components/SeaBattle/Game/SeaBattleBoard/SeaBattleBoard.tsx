import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import _ from 'lodash';
import { BoardSquare } from './BoardSquare';
import { Submarine, Board } from '../../../../models/seaBattleBoard';
import BoardSubmarine from './Submarine';
import { SubmarineModel } from '../SubmarinesGameTools';

const submarineSelectedBorder = {
    border: "1px solid green",
}

const rotateSubmarine = {
    transformOrigin: "center",
    transform: "rotate(90deg)"
}

const submarineContainer = {
    display: 'inline-block'
}

function getSubmarineStyle(index: number, selectedSubmarine: number | null, submarine: SubmarineModel) {
    let style = submarineContainer;
    if (index === selectedSubmarine) {
        style = Object.assign({}, submarineContainer, submarineSelectedBorder);
    }

    if (submarine.vertical) {
        style = Object.assign({}, style, rotateSubmarine);
    }

    return style;
}


export default function SeaBattleBoard(props: {
    board: Board,
    play?: (x: number, y: number) => void,
    placeSubmarine?: (submarine: Submarine, row: number, column: number) => boolean,
    submarines?: SubmarineModel[],
    setSubmarines?: (submarines: SubmarineModel[]) => void,
    itemsType?: string
}) {
    const {board, submarines=[], itemsType='', setSubmarines, play} = props;
    const [rotateDisable, setRotateDisable] = useState(true);
    const [hideRotate, setHideRotate] = useState(false);
    const [selectedSubmarine, setSelectedSubmarine] = useState<number | null>(null);

    function rotateHandler() {
        let submarinesToPlaceOnBoard = submarines;
        let index = 0;
        if (selectedSubmarine !== null) {
            index = selectedSubmarine;
        } else {
            submarinesToPlaceOnBoard = submarines.filter((submarine: SubmarineModel) => submarine.dropped);
        }
        
        submarinesToPlaceOnBoard[index].vertical = !submarinesToPlaceOnBoard[index].vertical;
        setSubmarines && setSubmarines([...submarines]) ;
    }

    function onSubmarineSelected(index: number) {
        setSelectedSubmarine(index);
        setRotateDisable(false);    
    }

    function onSubmarineDropped() {
        setRotateDisable(true);
        setSelectedSubmarine(null);
        if (isAllSubmarinePlaced()) {
            setHideRotate(true);
        }
    }

    function isAllSubmarinePlaced() {
        return submarines.filter((submarine: SubmarineModel) => submarine.dropped).length === submarines.length;
    }

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
                                                colIndex={colIndex}
                                                play={play}
                                                submarineDropped={onSubmarineDropped} />
                                })}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div>
                        {
                            submarines.map((submarine: SubmarineModel, index: number) => (
                                        <BoardSubmarine 
                                                key={submarine.id}
                                                itemsType={itemsType}
                                                submarine={submarine}
                                                submarineContainer={(drag, submarineJSX) => (
                                                    <div ref={drag} style={getSubmarineStyle(index, selectedSubmarine, submarine)} onClick={() => onSubmarineSelected(index)}>
                                                        {submarineJSX}
                                                    </div>
                                                )} />  
                                ))
                        }
                    </div>
                    {(submarines.length !== 0 && !hideRotate) && <button disabled={rotateDisable} onClick={rotateHandler}>Rotate</button>}
                </div>
            </DndProvider>
        </div>
    )
}