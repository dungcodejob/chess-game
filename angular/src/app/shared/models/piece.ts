import { Color } from './color';
import { Coords } from './coords';
import { FENChar } from './fen-char';

export abstract class Piece {
  protected abstract _char: FENChar;
  protected abstract _directions: Coords[];
  protected _color: Color;

  constructor(color: Color) {
    this._color = color;
  }
}
