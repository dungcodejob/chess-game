import { Component, input, OnInit } from "@angular/core";
import { Move } from "@shared/models";

@Component({
  selector: "app-game-move-list",
  templateUrl: "./game-move-list.component.html",
  styleUrls: ["./game-move-list.component.css"],
})
export class GameMoveListComponent {
  $move = input.required<Move[]>();
}
