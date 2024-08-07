import { Injectable, inject } from "@angular/core";
import { GameFacade } from "@play/data-access";

@Injectable()
export class GameControllerFacade {
  private readonly _store = inject(GameFacade);

  $moves = this._store.$moves;
}
