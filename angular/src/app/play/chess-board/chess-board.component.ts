import { NgClass } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, Type } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Bishop,
  Cell,
  Color,
  Coords,
  King,
  Knight,
  Pawn,
  Piece,
  Queen,
  Rook,
} from '@shared/models';
import { range } from '@shared/models/utils';
import { BehaviorSubject, pairwise, tap } from 'rxjs';

@Component({
  selector: 'app-chess-board',
  standalone: true,
  imports: [NgClass],
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.css',
})
export class ChessBoardComponent implements OnInit {
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _selectedPositionSubject =
    new BehaviorSubject<Coords | null>(null);
  board: Cell[][] = [];

  ngOnInit(): void {
    this.initializeBoard();
  }

  onSelect(x: number, y: number) {
    this._selectedPositionSubject.next({ x, y });
  }

  private initializeBoard() {
    for (const i of Array.from(range(0, 7))) {
      this.board[i] = [];
      for (const j of Array.from(range(0, 7))) {
        this.board[i][j] = new Cell();
      }
    }

    const pieceClasses: Type<Piece>[] = [
      Rook,
      Knight,
      Bishop,
      Queen,
      King,
      Bishop,
      Knight,
      Rook,
    ];

    for (const i of Array.from(range(0, 7))) {
      // Place the pieces on the 1st and 8th ranks
      this.board[0][i].piece = new pieceClasses[i](Color.Black);
      this.board[7][i].piece = new pieceClasses[i](Color.White);
      // Place the pawns on the 2nd and 7th ranks
      this.board[1][i].piece = new Pawn(Color.Black);
      this.board[6][i].piece = new Pawn(Color.White);
    }

    this._selectedPositionSubject
      .asObservable()
      .pipe(
        pairwise(),
        tap(([prevPosition, nextPosition]) => {
          // remove the previous move from the board
          if (prevPosition) {
            const prevPiece = this.board[prevPosition.x][prevPosition.y].piece;
            prevPiece?.unselect();
            const prevMoves =
              prevPiece != null ? prevPiece.getMoves(prevPosition) : [];

            for (const { x, y } of prevMoves) {
              this.board[x][y].inMoveRange = false;
            }
          }

          // add the next move to the board
          if (nextPosition) {
            const nextPiece = this.board[nextPosition.x][nextPosition.y].piece;
            nextPiece?.select();
            const nextMoves =
              nextPiece != null ? nextPiece.getMoves(nextPosition) : [];

              console.log(nextMoves);
            for (const { x, y } of nextMoves) {
              this.board[x][y].inMoveRange = true;
            }
          }

          console.log(this.board);
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }

  private getAvailableMoves() {}
}
