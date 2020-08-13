import { observer } from "mobx-react";
import { BoardSquare } from "../../../submarines";
import React from "react";

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