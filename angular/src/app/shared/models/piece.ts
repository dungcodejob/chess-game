import { Color } from './color';
import { Coords } from './coords';
import { FENChar } from './fen-char';
import { range } from './utils';

export abstract class Piece {
  protected abstract _char: FENChar;
  protected abstract _directions: Coords[];
  protected _color: Color;

  constructor(color: Color) {
    this._color = color;
  }

  protected abstract getMoves(position: Coords): Coords[];

  protected getStepMoves(position: Coords): Coords[] {
    const moves: Coords[] = [];

    for (const direction of this._directions) {
      const moveX = position.x + direction.x;
      const moveY = position.y + direction.y;
      if (this.isMoveWithinBoard({ x: moveX, y: moveY })) {
        moves.push({ x: moveX, y: moveX });
      }
    }

    return moves;
  }
  protected getStraightLineMoves(position: Coords): Coords[] {
    const moves: Coords[] = [];

    for (const direction of this._directions) {
      for (const index of Array.from(range(0, 8))) {
        const moveX = position.x + direction.x * index;
        const moveY = position.y + direction.y * index;
        if (this.isMoveWithinBoard({ x: moveX, y: moveY })) {
          moves.push({ x: moveX, y: moveX });
        }
      }
    }

    return moves;
  }

  protected isMoveWithinBoard(position: Coords): boolean {
    return (
      0 <= position.x && position.x < 8 && 0 <= position.y && position.y < 8
    );
  }
}
