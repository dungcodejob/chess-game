import { Cell } from "./cell";
import { Color } from "./color";
import { Coords } from "./coords";
import { ChessChar } from "./fen-char";
import { Piece } from "./piece";

export class Bishop extends Piece {
  protected override _char: ChessChar;
  protected override _directions: Coords[] = [
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: -1, y: -1 },
  ];

  constructor(color: Color) {
    super(color);
    this._char = color === Color.White ? ChessChar.WhiteBishop : ChessChar.BlackBishop;
  }

  getMoveRanges(position: Coords, board: Cell[][]): Coords[] {
    return this.getStraightLineMoves(position, board);
  }
}
