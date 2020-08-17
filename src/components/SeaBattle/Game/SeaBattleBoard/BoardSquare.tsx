import { CSSProperties } from "react"
import { useDrop } from "react-dnd"
import React from "react"
import { Square } from "./Square"
import BoardSubmarine from "./Submarine"
import { SubmarineModel } from "../SubmarinesGameTools"
import { Board, HorizontalSubmarine, VerticalSubmarine } from "../../../../models/seaBattleBoard"

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
        submarineDropped: () => void,
        play?: (x: number, y: number) => void
    }){
        const {rowIndex, colIndex, board, itemsType = '', submarineDropped, play} = props;
        const [{ isOver, item }, drop] = useDrop({
            accept: itemsType,
            drop: (item: {type: string, submarine: SubmarineModel}) => {
                const {submarine} = item;
                const dropResult = board.addSubmarine(!submarine.vertical ? new HorizontalSubmarine(submarine.size, false) : new VerticalSubmarine(submarine.size, true), rowIndex, colIndex)
                if (dropResult) {
                    submarine.dropped = true;
                }
                submarineDropped();
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
                    {submarine && 
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