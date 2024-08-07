import { Component } from "@angular/core";
import { GameBoardComponent } from "./containers/game-board/game-board.component";
import { GameFacade } from "./data-access";
import { GameStore } from "./data-access/game.store";
import { GameControllerComponent } from "./containers/game-controller/game-controller.component";
import { FENService } from "./data-access/fen.service";

@Component({
  selector: "app-game",
  standalone: true,
  imports: [GameBoardComponent, GameControllerComponent],
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"],
  providers: [FENService, GameFacade, GameStore],
})
export class GameComponent {}
