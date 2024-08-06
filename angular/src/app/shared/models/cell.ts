import { Coords } from "./coords";
import { Piece } from "./piece";

export interface Move {
  piece: Piece;
  from: Coords;
  to: Coords;
}

export type CellId = `${Coords["x"]}-${Coords["y"]}`;

export class Cell {
  private readonly _id: CellId;
  private _piece: Piece | null;
  private _position: Coords;
  private _inMoveRange: boolean;

  get id(): string {
    return this._id;
  }

  get position(): Coords {
    return this._position;
  }

  get piece(): Piece | null {
    return this._piece;
  }

  get inMoveRange(): boolean {
    return this._inMoveRange;
  }

  constructor(position: Coords) {
    this._id = Cell.positionToId(position);
    this._position = position;
    this._piece = null;
    this._inMoveRange = false;
  }

  setPiece(piece: Piece) {
    this._piece = piece;
  }

  private positionToNotation(position: Coords): { column: string; row: number } {
    const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const column = columns[position.x];

    // Chuyển đổi chỉ số hàng thành số hàng
    const row = 8 - position.y;

    return { column, row };
  }

  static positionToId = (position: Coords): CellId => {
    return `${position.x}-${position.y}`;
  };

  static idToPosition = (id: CellId): Coords => {
    const [x, y] = id.split("-").map(Number);
    return { x, y };
  };
}
