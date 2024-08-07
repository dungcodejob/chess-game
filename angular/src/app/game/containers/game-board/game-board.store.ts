import { computed, inject, Injectable, Injector, Type } from "@angular/core";
import { patchState, signalState } from "@ngrx/signals";
import {
  Bishop,
  Cell,
  CellId,
  Color,
  Coords,
  King,
  Knight,
  Move,
  Pawn,
  Piece,
  Queen,
  Rook,
} from "@shared/models";
import { range } from "@shared/utils";

interface GameBoardState {
  selectedId: CellId | null;
  moveRangeIds: CellId[];
}

const initialState: GameBoardState = {
  selectedId: null,
  moveRangeIds: [],
};

@Injectable()
export class GameBoardStore {
  private readonly _injector = inject(Injector);
  private readonly _$state = signalState(initialState);
  private readonly _boards: Cell[][] = [];

  readonly $boards = computed(() => this._boards);
  readonly $selectedId = this._$state.selectedId;
  readonly $moveRangeIds = this._$state.moveRangeIds;

  initialize() {
    this.initializeBoard();
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

  unselect() {
    patchState(this._$state, {
      selectedId: null,
      moveRangeIds: [],
    });
  }

  move(move: Move) {
    const { from, to } = move;
    const board = this._boards;
    const fromCell = board[from.x][from.y];
    const toCell = board[to.x][to.y];

    fromCell.setPiece(null);
    toCell.setPiece(move.fromPiece);

    this.unselect();
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
