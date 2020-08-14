import { CSSProperties } from "react"
import { useDrop } from "react-dnd"
import { HorizontalSubmarine, VerticalSubmarine, Board, Submarine } from "../../../submarines"
import React from "react"
import { Square } from "./Square"
import BoardSubmarine from "./Submarine"

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
            drop: (item: any) => {
                return board.addSubmarine(!item.vertical ? new HorizontalSubmarine(item.size) : new VerticalSubmarine(item.size), rowIndex, colIndex)
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
                    {submarine && <div style={styleVerticalSubmarine}><BoardSubmarine vertical={false} size={submarine.size} /></div>}
                    {isOver && (
                        <div style={styleVerticalSubmarine}>
                            <BoardSubmarine vertical={item.vertical} size={item.size} />  
                        </div>
                    )}
                    </div>
                </Square>
          )
    }