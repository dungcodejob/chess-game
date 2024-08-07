import { Component, inject } from "@angular/core";
import { GameMoveListComponent } from "../../components/game-move-list/game-move-list.component";
import { GameControllerFacade } from "./game-controller.facade";

@Component({
  selector: "app-game-controller",
  standalone: true,
  imports: [GameMoveListComponent],
  templateUrl: "./game-controller.component.html",
  styleUrl: "./game-controller.component.css",
  providers: [GameControllerFacade],
})
export class GameControllerComponent {
  private readonly _facade = inject(GameControllerFacade);

  $moves = this._facade.$moves;
}
