import { inject, Injectable } from "@angular/core";
import { GameFacade } from "@play/data-access";
import { GameBoardStore } from "./game-board.store";

@Injectable()
export class GameBoardFacade {
  private readonly _store = inject(GameBoardStore);
  private readonly _gameFacade = inject(GameFacade);

  readonly $boards = this._store.$boards;
  readonly $selectedId = this._store.$selectedId;
  readonly $moveRangeIds = this._store.$moveRangeIds;

  initialize = this._store.initialize;
}
