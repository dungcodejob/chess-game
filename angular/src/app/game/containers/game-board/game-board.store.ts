import { Injectable, Type } from "@angular/core";
import { patchState, signalState } from "@ngrx/signals";
import {
  Bishop,
  Cell,
  CellId,
  Color,
  King,
  Knight,
  Pawn,
  Piece,
  Queen,
  Rook
} from "@shared/models";
import { range } from "@shared/utils";

interface GameBoardState {
  boards: Cell[][];
  selectedId: string | null;
}

const initialState: GameBoardState = {
  boards: [],
  selectedId: null,
};

@Injectable()
export class GameBoardStore {
  private readonly $state = signalState(initialState);

  readonly $boards = this.$state.boards;
  readonly $selectedId = this.$state.selectedId;

  initialize() {
    this.initializeBoard();
  }

  select(id: CellId) {
    const board = this.$boards();
    const position = Cell.idToPosition(id);
    const cell = board[position.y][position.x];
    const piece = cell.piece;
    if (piece) {
      piece.getMoves();
      patchState(this.$state, { selectedId: id });
    }
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
}
