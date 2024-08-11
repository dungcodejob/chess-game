import { computed, inject, Injectable } from "@angular/core";
import { GameFacade } from "@play/data-access";
import { Cell, CellId, Move } from "@shared/models";

@Injectable()
export class GameBoardFacade {
  // private readonly _store = inject(GameBoardStore);
  private readonly _gameFacade = inject(GameFacade);

  readonly $boards = this._gameFacade.$boards;
  readonly $selectedId = this._gameFacade.$selectedId;
  readonly $moveRangeIds = this._gameFacade.$moveRangeIds;
  readonly $turn = this._gameFacade.$turn;
  readonly $selectedCell = computed(() => {
    const id = this.$selectedId();
    if (id) {
      const { x, y } = Cell.idToPosition(id);
      const cell = this.$boards()[x][y];
      return cell;
    }

    return null;
  });

  select(id: CellId) {
    this._gameFacade.select(id);
  }

  move(move: Move) {
    this._gameFacade.move(move);
  }
}
