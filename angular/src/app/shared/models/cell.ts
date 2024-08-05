import { Coords } from "./coords";
import { Piece } from "./piece";

export class Cell {
  id: string;
  piece: Piece | null;
  position: Coords;
  inMoveRange: boolean;
  selected: boolean;

  constructor(id: string, position: Coords, piece?: Piece) {
    this.id = id;
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

  private positionToNotation(position: Coords): { column: string; row: number } {
    const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const column = columns[position.x];

    // Chuyển đổi chỉ số hàng thành số hàng
    const row = 8 - position.y;

    return { column, row };
  }
}
