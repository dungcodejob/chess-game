import { inject, Injectable } from "@angular/core";
import { GameStore } from "./game.store";

@Injectable({ providedIn: "root" })
export class GameFacade {
  private readonly _store = inject(GameStore);

  $turn = this._store.turn;
  $fullMoveNumber = this._store.fullMoveNumber;
}
