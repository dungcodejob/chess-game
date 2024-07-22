import { Color } from './color';
import { Coords } from './coords';
import { FENChar } from './fen-char';
import { Piece } from './piece';

export class Pawn extends Piece {
  protected override _char: FENChar = FENChar.Pawn;
  protected override _directions: Coords[] = [
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: -1 },
  ];

  constructor(color: Color) {
    super(color);
    if (color === Color.Black) this.setBlackPawnDirections();
  }

  private setBlackPawnDirections(): void {
    this._directions = this._directions.map(({ x, y }) => ({ x: -1 * x, y }));
  }
}
