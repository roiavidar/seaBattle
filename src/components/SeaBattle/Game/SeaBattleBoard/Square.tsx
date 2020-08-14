import { observer } from "mobx-react";
import React from "react";
import { BoardSquare } from "../../../../models/seaBattleBoard";

export const Square = observer(function Square({ item, children }: { item?: BoardSquare, children: JSX.Element }) {
    if (!item) {
        throw new Error("Item cannot be null");
    }

    function handleClick() {
        item?.bomb();
    }

    return (
        <td onClick={handleClick}>
            {item.repr()}
            {children}
        </td>
    );
});