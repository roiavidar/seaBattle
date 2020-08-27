import { useDrag, DragPreviewImage } from "react-dnd";
import React, { CSSProperties } from "react";
import { SubmarineModel } from "../SubmarinesGameTools";

function getSubmarineStyle(isDragging: boolean) {
  let style: CSSProperties = {
    opacity: isDragging ? 0.5 : 1,
    fontSize: 25,
    fontWeight: 'bold',
    cursor: 'move'
  };

  return style;
}

const previewImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Antonia_Sautter_Creations.png/120px-Antonia_Sautter_Creations.png';

export default function Submarine(props: {
    submarine?: SubmarineModel,
    itemsType?: string,
    submarineContainer: (drag: any, submarine: JSX.Element | null) => JSX.Element
  }) {
    const {submarine, itemsType = '', submarineContainer} = props;
    const submarineSize = submarine?.size || 0;
    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: itemsType, submarine },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      });
      
      const imageUrl = `media/${submarineSize}-square-submarine.jpg`;
      return (
        submarineContainer(drag, 
          <>
           <DragPreviewImage src={previewImage} connect={preview} />
           <img 
              alt=''
              src={imageUrl}
              width={submarineSize*40}
              height={40}
              style={getSubmarineStyle(isDragging)}
            />
          </>
        )
      )
}