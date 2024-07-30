import { Coords } from './coords';
import { Piece } from './piece';

export class Cell {
  piece: Piece | null;
  position: Coords;
  inMoveRange: boolean;
  selected: boolean;

  constructor(position: Coords, piece?: Piece) {
    this.position = position;
    this.piece = piece ?? null;
    this.inMoveRange = false;
    this.selected = false;
  }

  select(): void {
    this.selected = true;
  }

  unselect(): void {
    this.selected = false;
  }

  getMoves(board: Cell[][]): Coords[] {
    if (this.piece) {
      return this.piece.getMoves(this.position, board);
    }

    return [];
  }
}
