import { useDrag } from "react-dnd";
import React from "react";
import { SubmarineModel } from "../SubmarinesGameTools";

export default function Submarine(props: {
    submarine?: SubmarineModel,
    size?: number,
    itemsType?: string
}) {
    const {submarine, itemsType = '', size} = props;
    const submarineSize = submarine?.size || size || 0;
    const [{ isDragging }, drag] = useDrag({
        item: { type: itemsType, submarine },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      });

      const imageUrl = `media/${submarineSize}-square-submarine.jpg`;
      return (
          !submarine?.dropped ?
           <img 
              alt=''
              ref={drag}
              src={imageUrl}
              width={submarineSize*40}
              height={40}
              style={{
                  opacity: isDragging ? 0.5 : 1,
                  fontSize: 25,
                  fontWeight: 'bold',
                  cursor: 'move'}}
            />
           :
          null
      )
}