import { observer } from "mobx-react";
import React, { CSSProperties } from "react";
import { BoardSquare } from "../../../../models/seaBattleBoard";

let markStyle: CSSProperties = {
    position: 'absolute',
    width: '40px',
    height: '40px',
    lineHeight: '40px',
    fontSize: '30px',
    fontWeight: 'bold',
    color: 'red'
}

function getMarkStyle(item: BoardSquare) {
    let elemStyle = {};
    if (item.repr() !== " ") {
        elemStyle = Object.assign(elemStyle, markStyle, { zIndex: 999999 });
    }

    if (item.repr() === '0') {
        elemStyle = Object.assign(elemStyle, markStyle, { color: 'blue' });
    } else {
        elemStyle = Object.assign(elemStyle, markStyle, { color: 'red' });
    }

    return elemStyle;
}


function SquareComponent({ item, children, play }: { 
    item?: BoardSquare,
    children: JSX.Element,
    play: () => void
 }) {
    if (!item) {
        throw new Error("Item cannot be null");
    }

    function handleClick() {
        play()
    }

    return (
        <td onClick={handleClick}>
            <div style={getMarkStyle(item)}>{item.repr()}</div>
            {children}
        </td>
    );
}

SquareComponent.defaultProps = {
    play: () => {}
}

export const Square = observer(SquareComponent);
