import { Component } from "@angular/core";
import { ChessBoardComponent } from "./chess-board/chess-board.component";

@Component({
  selector: "app-play",
  standalone: true,
  imports: [ChessBoardComponent],
  templateUrl: "./play.component.html",
  styleUrls: ["./play.component.css"],
})
export class PlayComponent {}
