import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Cell } from '@shared/models';

@Component({
  selector: 'app-chess-board',
  standalone: true,
  imports: [NgClass],
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.css',
})
export class ChessBoardComponent {
  board: Cell[][] = [
    new Array(8).fill({}),
    new Array(8).fill({}),
    new Array(8).fill({}),
    new Array(8).fill({}),
    new Array(8).fill({}),
    new Array(8).fill({}),
    new Array(8).fill({}),
    new Array(8).fill({}),
  ];
}
