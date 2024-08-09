import { Component, inject } from "@angular/core";
import { GameMoveListComponent } from "../../components/game-move-list/game-move-list.component";
import { GameTurnComponent } from "../../components/game-turn/game-turn.component";
import { GameControllerFacade } from "./game-controller.facade";

@Component({
  selector: "app-game-controller",
  standalone: true,
  imports: [GameMoveListComponent, GameTurnComponent],
  templateUrl: "./game-controller.component.html",
  styleUrl: "./game-controller.component.css",
  providers: [GameControllerFacade],
})
export class GameControllerComponent {
  private readonly _facade = inject(GameControllerFacade);

  $turn = this._facade.$turn;
  $moves = this._facade.$moves;
}
