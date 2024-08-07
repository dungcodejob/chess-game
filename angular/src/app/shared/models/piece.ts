import { range } from "../utils";
import { Cell } from "./cell";
import { Color } from "./color";
import { Coords } from "./coords";
import { ChessChar } from "./fen-char";

const charNames: Record<ChessChar, string> = {
  [ChessChar.BlackBishop]: "b_bishop",
  [ChessChar.BlackKing]: "b_king",
  [ChessChar.BlackKnight]: "b_knight",
  [ChessChar.BlackPawn]: "b_pawn",
  [ChessChar.BlackQueen]: "b_queen",
  [ChessChar.BlackRook]: "b_rook",
  [ChessChar.WhiteBishop]: "w_bishop",
  [ChessChar.WhiteKing]: "w_king",
  [ChessChar.WhiteKnight]: "w_knight",
  [ChessChar.WhitePawn]: "w_pawn",
  [ChessChar.WhiteQueen]: "w_queen",
  [ChessChar.WhiteRook]: "w_rook",
};

export abstract class Piece {
  protected abstract _char: ChessChar;
  protected abstract _directions: Coords[];
  protected _color: Color;

  get char(): ChessChar {
    return this._char;
  }

  get color(): Color {
    return this._color;
  }
  get asset(): string {
    const charName = charNames[this._char];
    return `assets/pieces/${charName}.svg`;
  }

  constructor(color: Color) {
    this._color = color;
  }

  abstract getMoveRanges(position: Coords, board: Cell[][]): Coords[];

  protected getStepMoves(position: Coords, board: Cell[][]): Coords[] {
    const moves: Coords[] = [];

    for (const direction of this._directions) {
      const moveX = position.x + direction.x;
      const moveY = position.y + direction.y;
      const isMoveWithinBoard = this.isMoveWithinBoard({
        x: moveX,
        y: moveY,
      });
      if (isMoveWithinBoard) {
        const isMoveEmpty = !board[moveX][moveY].piece;
        if (isMoveEmpty) {
          moves.push({ x: moveX, y: moveY });
        }
      }
    }

    return moves;
  }
  protected getStraightLineMoves(position: Coords, board: Cell[][]): Coords[] {
    const moves: Coords[] = [];

    for (const direction of this._directions) {
      for (const index of Array.from(range(1, 7))) {
        const moveX = position.x + direction.x * index;
        const moveY = position.y + direction.y * index;
        const isMoveWithinBoard = this.isMoveWithinBoard({
          x: moveX,
          y: moveY,
        });

        if (isMoveWithinBoard) {
          const isMoveEmpty = !board[moveX][moveY].piece;
          if (isMoveEmpty) {
            moves.push({ x: moveX, y: moveY });
          } else {
            break;
          }
        }
      }
    }

    return moves;
  }

  protected isMoveWithinBoard(position: Coords): boolean {
    return 0 <= position.x && position.x < 8 && 0 <= position.y && position.y < 8;
  }
}
