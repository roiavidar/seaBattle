import { CSSProperties } from "react"
import { useDrop } from "react-dnd"
import React from "react"
import { Square } from "./Square"
import BoardSubmarine from "./Submarine"
import { SubmarineModel } from "../SubmarinesGameTools"
import { Board, HorizontalSubmarine, VerticalSubmarine } from "../../../../models/seaBattleBoard"

const styleVerticalSubmarine: CSSProperties = {
    position: 'absolute'
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
        itemsType: string
    }){
        const {rowIndex, colIndex, board, itemsType = ''} = props;
        const [{ isOver, item }, drop] = useDrop({
            accept: itemsType,
            drop: (item: {type: string, submarine: SubmarineModel}) => {
                const {submarine} = item;
                submarine.dropped = true;
                const dropResult = board.addSubmarine(!submarine.vertical ? new HorizontalSubmarine(submarine.size) : new VerticalSubmarine(submarine.size), rowIndex, colIndex)
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

          const submarine = getSubmarine(rowIndex, colIndex);
          
          return (
                <Square key={colIndex} item={board.cellAt([rowIndex, colIndex])}>
                    <div ref={drop} style={squareStyle}>
                    {submarine && 
                        <div style={styleVerticalSubmarine}>
                            <BoardSubmarine size={submarine.size} />
                        </div>
                    }
                    {isOver && (
                        <div style={styleVerticalSubmarine}>
                            <BoardSubmarine submarine={item.submarine} />  
                        </div>
                    )}
                    </div>
                </Square>
          )
    }