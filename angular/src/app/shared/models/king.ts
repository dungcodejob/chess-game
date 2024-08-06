import { Cell } from "./cell";
import { Color } from "./color";
import { Coords } from "./coords";
import { ChessChar } from "./fen-char";
import { Piece } from "./piece";

export class King extends Piece {
  protected override _char: ChessChar;
  protected override _directions: Coords[] = [
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
    { x: -1, y: -1 },
  ];

  constructor(color: Color) {
    super(color);

    this._char = color === Color.White ? ChessChar.WhiteKing : ChessChar.BlackKing;
  }

  getMoveRanges(position: Coords, board: Cell[][]): Coords[] {
    return this.getStepMoves(position, board);
  }
}
