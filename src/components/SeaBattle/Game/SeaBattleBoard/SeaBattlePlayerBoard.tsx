import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import _ from 'lodash';
import { Submarine, Board } from '../../../../models/seaBattleBoard';
import BoardSubmarine from './Submarine';
import { SubmarineModel } from '../submarine.model';
import SeaBattleBoard from './SeaBattleBoard';

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


export default function SeaBattlePlayerBoard(props: {
    board: Board,
    placeSubmarine: (submarine: Submarine, row: number, column: number) => boolean,
    submarines: SubmarineModel[],
    setSubmarines: (submarines: SubmarineModel[]) => void,
    itemsType: string
}) {
    const {board, submarines=[], itemsType='', setSubmarines, placeSubmarine} = props;
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
        setSubmarines && setSubmarines([...submarines]);
        if (isAllSubmarinePlaced()) {
            setHideRotate(true);
        }
    }

    function isAllSubmarinePlaced() {
        return submarines.filter((submarine: SubmarineModel) => submarine.dropped).length === submarines.length;
    }

    function renderSubmarinesTools() {
        return submarines.map((submarine: SubmarineModel, index: number) => (
                        !submarine?.dropped ?
                            <BoardSubmarine 
                            key={submarine.id}
                            itemsType={itemsType}
                            submarine={submarine}
                            submarineContainer={(drag, submarineJSX) => (
                                <div ref={drag} style={getSubmarineStyle(index, selectedSubmarine, submarine)} onClick={() => onSubmarineSelected(index)}>
                                    {submarineJSX}
                                </div>
                            )} />
                            : null 
            ))
    }

    function renderRotateButton() {
        return (submarines.length !== 0 && !hideRotate) && <button disabled={rotateDisable} onClick={rotateHandler}>Rotate</button>
    }

    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <div>
                    <SeaBattleBoard
                        board={board}
                        itemsType={itemsType}
                        placeSubmarine={placeSubmarine}
                        submarines={submarines}
                        setSubmarines={setSubmarines}
                        onSubmarineDropped={onSubmarineDropped} />
                    <div>
                        {renderSubmarinesTools()}
                    </div>
                    {renderRotateButton()}
                </div>
            </DndProvider>
        </div>
    )
}