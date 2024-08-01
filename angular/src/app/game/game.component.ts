import { Component } from "@angular/core";
import { GameBoardComponent } from "./containers/game-board/game-board.component";

@Component({
  selector: "app-game",
  standalone: true,
  imports: [GameBoardComponent],
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"],
})
export class GameComponent {}
