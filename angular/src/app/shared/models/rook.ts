import { Cell } from './cell';
import { Color } from './color';
import { Coords } from './coords';
import { ChessChar } from './fen-char';
import { Piece } from './piece';

export class Rook extends Piece {
  protected override _char: ChessChar = ChessChar.Rook;
  protected override _directions: Coords[] = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ];

  constructor(color: Color) {
    super(color);
  }

  getMoves(position: Coords, board: Cell[][]): Coords[] {
    return this.getStraightLineMoves(position, board);
  }
}
