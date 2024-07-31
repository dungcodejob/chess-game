import { Cell } from "./cell";
import { Color } from "./color";
import { Coords } from "./coords";
import { ChessChar } from "./fen-char";
import { Piece } from "./piece";

export class Pawn extends Piece {
  protected override _char: ChessChar = ChessChar.Pawn;
  protected override _directions: Coords[] = [
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: -1 },
  ];

  constructor(color: Color) {
    super(color);
    if (color !== Color.Black) this.setWhitePawnDirections();
  }

  private setWhitePawnDirections(): void {
    this._directions = this._directions.map(({ x, y }) => ({
      x: x * -1,
      y: y,
    }));
  }

  getMoves(position: Coords, board: Cell[][]): Coords[] {
    return this.getStepMoves(position, board);
  }
}
