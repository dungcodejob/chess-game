import { Piece } from './piece';

export class Cell {
  piece: Piece | null;
  inMoveRange: boolean = false;

  get selected(): boolean {
    return this.piece !== null ? this.piece.selected : false;
  }
  constructor(piece?: Piece) {
    this.piece = piece ?? null;
  }

  select() {
    if (this.piece) {
      this.piece.select();
    }
  }
}
