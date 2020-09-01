import { observable } from "mobx";
import { computedFn } from "mobx-utils";
import _ from "lodash";
import { SubmarineModel } from "../components/SeaBattle/Game/submarine.model";

export type Point = [number, number];

export class BoardSquare {
    @observable item: Submarine|Sea;
    @observable id: number;
    @observable revealed: boolean = false;

    constructor(item: Sea|Submarine, id: number) {
        this.item = item;
        this.id = id;
    }

    bomb() {
        this.item.hit(this.id);
        this.revealed = true;
    }

    repr = computedFn(function repr(this: BoardSquare) {
        if (this.revealed) {
            return this.item.repr();
        } else {
            return " ";
        }

    });
}

export class Board {
    @observable data: Map<string, BoardSquare> = new Map();
    rowCount: number;
    columnCount: number;
    @observable submarines: Map<string, Submarine> = new Map();

    constructor(rowCount: number, columnCount: number) {
        this.rowCount = rowCount;
        this.columnCount = columnCount;

        for (let i=0; i < rowCount; i++) {
            for (let j=0; j < columnCount; j++) {
                this.data.set(`${i},${j}`, new BoardSquare(new Sea(), 0));
            }
        }
    }

    addSubmarine(submarine: Submarine, row: number, column: number) {
        const coords = submarine.getCoordinates(row, column);
        for (let i=0; i < coords.length; i++) {
            const square = this.cellAt(coords[i]);
            if (square == null) {
                return false;
            }

            square.item  = submarine;
            square.id    = i;
        }
        this.submarines.set(`${row}-${column}`, submarine);
        return true;
    }

    removeSubmarine(coords: Point[]) {
        for (let i=0; i < coords.length; i++) {
            const square = this.cellAt(coords[i]);
            if (square == null) {
                return false;
            }

            square.item  = new Sea();
            square.revealed = false;
            this.submarines.delete(`${coords[i][0]}-${coords[i][1]}`);
        }
        return true;
    }

    bomb(pos: Point) {
        const square = this.cellAt(pos);
        if (square == null || square.revealed) return;
        square.bomb();
        return square.item.repr();
    }

    getSubmarine(row: number, col: number) {
        return this.submarines.get(`${row}-${col}`);
    }

    cellAt(pos: Point) {
        const [row, col] = pos;
        return this.data.get(`${row},${col}`);
    }

    repr() {
        let res = "";
        for (let i=0; i < this.rowCount; i++) {
            for (let j=0; j < this.columnCount; j++) {
                let square = this.data.get(`${i},${j}`);
                if (square == null) {
                    throw new Error("Invalid Board");
                }
                res += square.repr;
            }
            res += "\n";
        }
        return res;
    }
}

class Sea {
    hit(id: number) {}

    repr() {
        return "0";
    }
}

export abstract class Submarine extends Sea implements SubmarineModel {
    size: number;
    @observable bombed: Set<number> = new Set();
    @observable sank: boolean = false;
    vertical: boolean;
    row: number | undefined;
    col: number | undefined;
    hide: boolean | undefined;
    partial: boolean;

    abstract getCoordinates(row: number, column: number): Point [];

    constructor(size: number, vertical: boolean, partial: boolean = false) {
        super();
        this.size = size;
        this.vertical = vertical;
        this.partial = partial;
    }

    hit(id: number) {
        super.hit(id);
        this.bombed.add(id);
        if (this.bombed.size === this.size) {
            this.sank = true;
        }
    }

    repr() {
        if (this.sank) {
            return "X";
        } else {
            return "/";
        }
    }
}

export class VerticalSubmarine extends Submarine {
    constructor(size: number, partial: boolean = false) {
        super(size, true, partial);
    }

    getCoordinates(row: number, column: number) {
        return _.range(this.size).map((i): Point => ([row + i, column]));
    }
}

export class HorizontalSubmarine extends Submarine {
    constructor(size: number, partial: boolean = false) {
        super(size, false, partial);
    }

    getCoordinates(row: number, column: number) {
        return _.range(this.size).map((i): Point => ([row, column + i]));
    }
}