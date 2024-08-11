import { Injectable, inject } from "@angular/core";
import { GameFacade } from "@play/data-access";

@Injectable()
export class GameControllerFacade {
  private readonly _store = inject(GameFacade);

  $moveHistory = this._store.$moveHistory;
  $turn = this._store.$turn;
}
