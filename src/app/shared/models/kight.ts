import { Color } from './color';
import { Coords } from './coords';
import { FENChar } from './fen-char';
import { Piece } from './piece';

export class Knight extends Piece {
  protected override _char: FENChar = FENChar.Knight;
  protected override _directions: Coords[] = [
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
  }
}
