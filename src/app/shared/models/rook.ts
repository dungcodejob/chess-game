import { Color } from './color';
import { Coords } from './coords';
import { FENChar } from './fen-char';
import { Piece } from './piece';

export class Rook extends Piece {
  protected override _char: FENChar = FENChar.Rook;
  protected override _directions: Coords[] = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ];

  constructor(color: Color) {
    super(color);
  }
}
