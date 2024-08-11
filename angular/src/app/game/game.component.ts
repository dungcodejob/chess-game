import { Component, inject, OnInit } from "@angular/core";
import { Color, Level } from "@shared/models";
import { GameBoardComponent } from "./containers/game-board/game-board.component";
import { GameControllerComponent } from "./containers/game-controller/game-controller.component";
import { GameFacade } from "./data-access";
import { FENService } from "./data-access/fen.service";
import { GameStore } from "./data-access/game.store";

@Component({
  selector: "app-game",
  standalone: true,
  imports: [GameBoardComponent, GameControllerComponent],
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"],
  providers: [FENService, GameFacade, GameStore],
})
export class GameComponent implements OnInit {
  private readonly _facade = inject(GameFacade);

  ngOnInit(): void {
    this._facade.startGame(Color.White, Level.Beginner);
  }
}
