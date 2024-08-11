import { inject, Injectable, Injector } from "@angular/core";
import { CellId, Color, Level, Move } from "@shared/models";
import { GameStore } from "./game.store";

@Injectable()
export class GameFacade {
  private readonly _injector = inject(Injector);
  private readonly _store = inject(GameStore);

  $boards = this._store.$boards;
  $turn = this._store.$turn;
  $fullMoveNumber = this._store.$fullMoveNumber;
  $selectedId = this._store.$selectedId;
  $moveRangeIds = this._store.$moveRangeIds;

  $moveHistory = this._store.$moveHistory;

  startGame(playerColor: Color, level: Level) {
    this._store.startGame(playerColor, level);
  }

  select(id: CellId) {
    this._store.select(id);
  }

  move(move: Move) {
    this._store.move(move);
  }
}
