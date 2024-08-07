import { effect, inject, Injectable, Injector, untracked } from "@angular/core";
import { GameStore } from "./game.store";
import { Move } from "@shared/models";

@Injectable()
export class GameFacade {
  private readonly _injector = inject(Injector);
  private readonly _store = inject(GameStore);

  $turn = this._store.turn;
  $fullMoveNumber = this._store.fullMoveNumber;
  $moves = this._store.moves;

  initialize() {
  }

  addMove(move: Move) {
    this._store.addMove(move);
  }
}
