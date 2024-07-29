import { Color } from './color';
import { Coords } from './coords';
import { ChessChar } from './fen-char';
import { range } from './utils';

const charNames: Record<ChessChar, string> = {
  [ChessChar.Pawn]: 'pawn',
  [ChessChar.Knight]: 'knight',
  [ChessChar.Bishop]: 'bishop',
  [ChessChar.Rook]: 'rook',
  [ChessChar.Queen]: 'queen',
  [ChessChar.King]: 'king',
};

const colorPaths: Record<Color, string> = {
  [Color.White]: 'w',
  [Color.Black]: 'b',
};

export abstract class Piece {
  protected abstract _char: ChessChar;
  protected abstract _directions: Coords[];
  protected _color: Color;
  protected _selected = false;

  get selected(): boolean {
    return this._selected;
  }
  get asset(): string {
    const charName = charNames[this._char];
    const colorPath = colorPaths[this._color];
    return `assets/pieces/${colorPath}_${charName}.svg`;
  }

  constructor(color: Color) {
    this._color = color;
  }

  select() {
    this._selected = true;
  }

  unselect() {
    this._selected = false;
  }

  abstract getMoves(position: Coords): Coords[];

  protected getStepMoves(position: Coords): Coords[] {
    const moves: Coords[] = [];

    for (const direction of this._directions) {
      const moveX = position.x + direction.x;
      const moveY = position.y + direction.y;
      if (this.isMoveWithinBoard({ x: moveX, y: moveY })) {
        moves.push({ x: moveX, y: moveY });
      }
    }

    return moves;
  }
  protected getStraightLineMoves(position: Coords): Coords[] {
    const moves: Coords[] = [];

    for (const direction of this._directions) {
      for (const index of Array.from(range(0, 7))) {
        const moveX = position.x + direction.x * index;
        const moveY = position.y + direction.y * index;
        if (this.isMoveWithinBoard({ x: moveX, y: moveY })) {
          moves.push({ x: moveX, y: moveY });
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
