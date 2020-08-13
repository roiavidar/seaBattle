import { useDrag } from "react-dnd";
import React from "react";

export default function Submarine(props: {
    height: number,
    width: number,
    src: string,
    vertical: boolean,
    size: number,
    itemsType?: string
}) {
    const {width, height, src, vertical, size, itemsType = ''} = props;
    const [{ isDragging }, drag] = useDrag({
        item: { type: itemsType, vertical, size, width, height, src },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      })
    
      return (
          <img 
                alt=''
                ref={drag}
                height={height}
                width={width} 
                src={src}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    fontSize: 25,
                    fontWeight: 'bold',
                    cursor: 'move'
                  }} />
      )
}