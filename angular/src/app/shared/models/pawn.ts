import { Cell, Move } from "./cell";
import { Color } from "./color";
import { Coords } from "./coords";
import { ChessChar } from "./fen-char";
import { Piece } from "./piece";

export class Pawn extends Piece {
  protected override _char: ChessChar;
  protected override _directions: Coords[] = [
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: -1 },
  ];

  protected _hasMoved: boolean;

  constructor(color: Color) {
    super(color);
    if (color !== Color.Black) this.setWhitePawnDirections();
    this._char = color === Color.White ? ChessChar.WhitePawn : ChessChar.BlackPawn;

    this._hasMoved = false;
  }

  private setWhitePawnDirections(): void {
    this._directions = this._directions.map(({ x, y }) => ({
      x: x * -1,
      y: y,
    }));
  }

  getMoveRanges(position: Coords, board: Cell[][]): Coords[] {
    return this.getStepMoves(position, board);
  }

  override move(move: Move, board: Cell[][]): void {
    super.move(move, board);
    if (!this._hasMoved) {
      this._directions = this._directions.filter(item => Math.abs(item.x) !== 2);
      this._hasMoved = true;
    }
  }
}
