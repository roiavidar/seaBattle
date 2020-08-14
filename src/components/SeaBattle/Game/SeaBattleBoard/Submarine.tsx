import { useDrag } from "react-dnd";
import React from "react";

export default function Submarine(props: {
    vertical: boolean,
    size: number,
    itemsType?: string
}) {
    const {vertical, size, itemsType = ''} = props;
    const [{ isDragging }, drag] = useDrag({
        item: { type: itemsType, vertical, size },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      });

      const imageUrl = `media/${size}-square-submarine.jpg`;
    
      return (
          <img 
                alt=''
                ref={drag}
                src={imageUrl}
                width={size*40}
                height={40}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    fontSize: 25,
                    fontWeight: 'bold',
                    cursor: 'move'
                  }} />
      )
}