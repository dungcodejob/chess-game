import { Color } from './color';
import { Coords } from './coords';
import { FENChar } from './fen-char';
import { Piece } from './piece';

export class Bishop extends Piece {
  protected override _char: FENChar = FENChar.Bishop;
  protected override _directions: Coords[] = [
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: -1, y: -1 },
  ];

  constructor(color: Color) {
    super(color);
  }
}
