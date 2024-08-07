import { computed, inject, Injectable } from "@angular/core";
import { GameFacade } from "@play/data-access";
import { GameBoardStore } from "./game-board.store";
import { Cell, CellId, Coords, Move, Piece } from "@shared/models";

@Injectable()
export class GameBoardFacade {
  private readonly _store = inject(GameBoardStore);
  private readonly _gameFacade = inject(GameFacade);

  readonly $boards = this._store.$boards;
  readonly $selectedId = this._store.$selectedId;
  readonly $moveRangeIds = this._store.$moveRangeIds;
  readonly $turn = this._gameFacade.$turn;
  readonly $selectedPiece = computed(() => {
    const id = this.$selectedId();
    if (id) {
      const { x, y } = Cell.idToPosition(id);
      const cell = this.$boards()[x][y];
      return cell.piece;
    }

    return null
  });

  initialize (){
    this._store.initialize()
  };

  select(id: CellId) {
    this._store.select(id)
  };

  unselect() {
    this._store.unselect()
  };
  
  move(move: Move) {
    this._store.move(move);
    this._gameFacade.addMove(move);
  }


}
