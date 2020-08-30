import { CSSProperties } from "react"
import { useDrop } from "react-dnd"
import React from "react"
import { Square } from "./Square"
import BoardSubmarine from "./Submarine"
import { Board, HorizontalSubmarine, VerticalSubmarine, Submarine } from "../../../../models/seaBattleBoard"
import { SubmarineModel } from "../submarine.model"

const styleHorizontalSubmarine: CSSProperties = {
    top: 0,
    transformOrigin: 'center bottom',
    transform: 'translate(-50%, -50%) rotate(90deg)',
    width: '100%',
    height: '100%'
}

const submarineStyle: CSSProperties = {
    position: 'absolute'
}

function getSubmarineStyle(submarine: any): CSSProperties {
    let style = submarineStyle;
  
    if (submarine && submarine.vertical) {
        style = Object.assign({}, style, styleHorizontalSubmarine);
    }
  
    return style;
  }
  

const squareStyle: CSSProperties = {
    position: 'relative',
    height: '100%',
    width: '100%'
}

export function BoardSquare(props: {
        rowIndex: number,
        colIndex: number,
        board: Board,
        itemsType: string,
        submarineDropped?: () => void,
        addSubmarine: ((submarine: Submarine, row: number, column: number) => boolean) | undefined,
        play?: (x: number, y: number) => void,
        showSubmarines: boolean
    }){
        const {rowIndex, colIndex, board, itemsType = '', submarineDropped, play, addSubmarine, showSubmarines} = props;
        const [{ isOver, item }, drop] = useDrop({
            accept: itemsType,
            drop: (item: {type: string, submarine: SubmarineModel}) => {
                const {submarine} = item;
                const dropResult = addSubmarine && addSubmarine(!submarine.vertical ? new HorizontalSubmarine(submarine.size) : new VerticalSubmarine(submarine.size), rowIndex, colIndex)
                if (dropResult) {
                    submarine.dropped = true;
                }
                submarineDropped && submarineDropped();
                return {
                    dropResult
                }
            },
            collect: monitor => ({
              isOver: !!monitor.isOver(),
              item: monitor.getItem()
            }),
          });
    
          function getSubmarine(rowIndex: number, colIndex: number) {
            return board.isSubmarineStarts(rowIndex, colIndex);
          }

          function handlePlay(rowIndex: number, colIndex: number) {
            play && play(rowIndex, colIndex);
          }

          const submarine = getSubmarine(rowIndex, colIndex);
         
          return (
                <Square key={colIndex} item={board.cellAt([rowIndex, colIndex])} play={() => handlePlay(rowIndex, colIndex)}>
                    <div ref={drop} style={squareStyle}>
                    {submarine && showSubmarines && !submarine.partial &&
                            <BoardSubmarine 
                                    submarine={submarine}
                                    submarineContainer={(drag, submarineJSX) => (
                                        <div ref={drag} style={getSubmarineStyle(submarine)}>
                                            {submarineJSX}
                                        </div>
                                    )} />
                    }
                    {isOver && (
                            <BoardSubmarine
                                 submarine={item.submarine}
                                 submarineContainer={(drag, submarineJSX) => (
                                    <div ref={drag} style={getSubmarineStyle(item.submarine)}>            
                                        {submarineJSX}
                                    </div>
                                 )} />  
                    )}
                    </div>
                </Square>
          )
    }