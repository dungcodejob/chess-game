import { Color } from './color';
import { Coords } from './coords';
import { ChessChar } from './fen-char';
import { Piece } from './piece';

export class Queen extends Piece {
  protected override _char: ChessChar = ChessChar.Queen;
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
  }

  getMoves(position: Coords): Coords[] {
    return this.getStraightLineMoves(position);
  }
}
