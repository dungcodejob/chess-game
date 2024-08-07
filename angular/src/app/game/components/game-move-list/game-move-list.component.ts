import { Component, inject, input } from "@angular/core";
import { FENService } from "@play/data-access/fen.service";
import { Move } from "@shared/models";

@Component({
  selector: "app-game-move-list",
  templateUrl: "./game-move-list.component.html",
  styleUrls: ["./game-move-list.component.css"],
  standalone: true,
})
export class GameMoveListComponent {
  private readonly _fENService = inject(FENService);

  $moves = input.required({
    alias: "moves",
    transform: (moves: Move[]) => this._fENService.moveToCoordinates(moves),
  });
}
