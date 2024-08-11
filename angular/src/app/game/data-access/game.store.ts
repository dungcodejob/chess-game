import { computed, Injectable, Type } from "@angular/core";
import { patchState, signalState } from "@ngrx/signals";
import {
  Bishop,
  Cell,
  CellId,
  ChessChar,
  Color,
  Coords,
  King,
  Knight,
  Level,
  Move,
  Pawn,
  Piece,
  Queen,
  Rook,
} from "@shared/models";
import { range } from "@shared/utils";

type CastlingAvailability =
  | ChessChar.WhiteKing
  | ChessChar.WhiteQueen
  | ChessChar.BlackKing
  | ChessChar.BlackQueen;

enum GameStatus {
  NotStarted = "NOT_STARTED",
  InProgress = "IN_PROGRESS",
  Lost = "LOST",
  Win = "WIN",
  Draw = "DRAW",
}

interface GameState {
  turn: Color;
  castlingAvailabilities: CastlingAvailability[];
  enPassantTarget: Coords | null;
  halfMoveClock: number;
  fullMoveNumber: number;
  selectedId: CellId | null;
  moveRangeIds: CellId[];
  moveHistory: Move[];
  level: Level;
  playerColor: Color;
  status: GameStatus;
}

const initialState: GameState = {
  moveHistory: [],
  level: Level.Default,
  playerColor: Color.Default,
  turn: Color.White,
  halfMoveClock: 0,
  fullMoveNumber: 1,
  enPassantTarget: null,
  castlingAvailabilities: [
    ChessChar.WhiteKing,
    ChessChar.WhiteQueen,
    ChessChar.BlackKing,
    ChessChar.BlackQueen,
  ],
  selectedId: null,
  moveRangeIds: [],
  status: GameStatus.NotStarted,
};

@Injectable()
export class GameStore {
  private readonly _$state = signalState(initialState);
  private readonly _boards: Cell[][] = [];

  readonly $status = this._$state.status;
  readonly $level = this._$state.level;
  readonly $playerColor = this._$state.playerColor;
  readonly $moveHistory = this._$state.moveHistory;

  readonly $boards = computed(() => this._boards);

  readonly $turn = this._$state.turn;
  readonly $fullMoveNumber = this._$state.fullMoveNumber;

  readonly $selectedId = this._$state.selectedId;
  readonly $moveRangeIds = this._$state.moveRangeIds;

  startGame(playerColor: Color, level: Level) {
    this.initializeBoard();
    patchState(this._$state, { playerColor, level, status: GameStatus.InProgress });
  }

  select(id: CellId) {
    const board = this._boards;
    const position = Cell.idToPosition(id);
    const cell = board[position.x][position.y];
    const piece = cell.piece;
    if (piece) {
      const range = piece.getMoveRanges(position, board);
      patchState(this._$state, {
        selectedId: id,
        moveRangeIds: Cell.positionToId(range),
      });
    }
  }

  move(move: Move) {
    this.handleMove(move);
    this.updateEnPassantTarget(move);
    this.updateHalfMoveClock(move);
    this.updateTurn();
  }

  private initializeBoard() {
    const boards = this.$boards();
    for (const i of Array.from(range(0, 7))) {
      boards[i] = [];
      for (const j of Array.from(range(0, 7))) {
        boards[i][j] = new Cell({ x: i, y: j });
      }
    }

    const pieceClasses: Type<Piece>[] = [
      Rook,
      Knight,
      Bishop,
      Queen,
      King,
      Bishop,
      Knight,
      Rook,
    ];

    for (const i of Array.from(range(0, 7))) {
      // Place the pieces on the 1st and 8th ranks
      boards[0][i].setPiece(new pieceClasses[i](Color.Black));
      boards[7][i].setPiece(new pieceClasses[i](Color.White));
      // Place the pawns on the 2nd and 7th ranks
      boards[1][i].setPiece(new Pawn(Color.Black));
      boards[6][i].setPiece(new Pawn(Color.White));
    }
  }

  private handleMove(move: Move) {
    const { movePiece } = move;
    const board = this._boards;

    movePiece.move(move, board);

    patchState(this._$state, {
      moveHistory: [...this._$state.moveHistory(), move],
    });
  }

  private updateEnPassantTarget(move: Move) {
    const { from, to, movePiece } = move;
    if (movePiece instanceof Pawn) {
      if (Math.abs(from.x - to.x) === 2) {
        // Calculate the en passant target square
        const enPassantRow = (from.x + to.x) / 2;
        const enPassantCol = from.y;
        patchState(this._$state, {
          enPassantTarget: { x: enPassantRow, y: enPassantCol },
        });
      }
    }
  }

  private updateHalfMoveClock(move: Move) {
    const isHalfMove = this.checkHalfMove(move);
    const halfMoveClock = isHalfMove ? this._$state.halfMoveClock() + 1 : 0;

    patchState(this._$state, {
      fullMoveNumber: this._$state.fullMoveNumber() + 1,
      halfMoveClock,
    });
  }

  private updateTurn() {
    patchState(this._$state, {
      turn: this._$state.turn() === Color.White ? Color.Black : Color.White,
      selectedId: null,
      moveRangeIds: [],
    });
  }

  private checkHalfMove = (move: Move) => {
    const { movePiece: fromPiece, capturedPiece: toPiece } = move;
    if (!toPiece) {
      return false;
    }
    if (
      fromPiece.char === ChessChar.WhitePawn ||
      fromPiece.char === ChessChar.BlackPawn
    ) {
      return true;
    }

    return false;
  };
}
