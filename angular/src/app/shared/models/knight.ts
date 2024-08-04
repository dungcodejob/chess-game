import { Cell } from "./cell";
import { Color } from "./color";
import { Coords } from "./coords";
import { ChessChar } from "./fen-char";
import { Piece } from "./piece";

export class Knight extends Piece {
  protected _char: ChessChar;
  protected _directions: Coords[] = [
    { x: 1, y: 2 },
    { x: 1, y: -2 },
    { x: -1, y: 2 },
    { x: -1, y: -2 },
    { x: 2, y: 1 },
    { x: 2, y: -1 },
    { x: -2, y: 1 },
    { x: -2, y: -1 },
  ];

  constructor(color: Color) {
    super(color);
    this._char = color === Color.White ? ChessChar.WhiteKnight : ChessChar.BlackKnight;
  }

  getMoves(position: Coords, board: Cell[][]): Coords[] {
    return this.getStepMoves(position, board);
  }
}
