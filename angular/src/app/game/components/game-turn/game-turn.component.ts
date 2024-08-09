import { Component, input } from "@angular/core";
import { Color } from "@shared/models";

@Component({
  selector: "app-game-turn",
  standalone: true,
  imports: [],
  templateUrl: "./game-turn.component.html",
  styleUrl: "./game-turn.component.css",
})
export class GameTurnComponent {
  $turn = input.required({ alias: "turn" });

  Color = Color;
}
