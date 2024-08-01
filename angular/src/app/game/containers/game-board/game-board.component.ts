import { NgClass } from "@angular/common";
import { Component, DestroyRef, inject, OnInit, Type } from "@angular/core";
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
} from "@shared/models";
import { range } from "@shared/models/utils";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-game-board",
  standalone: true,
  imports: [NgClass],
  templateUrl: "./game-board.component.html",
  styleUrl: "./game-board.component.css",
})
export class GameBoardComponent implements OnInit {
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _selectedCellSubject = new BehaviorSubject<Cell | null>(null);
  private readonly _turnSubject = new BehaviorSubject<Color>(Color.White);
  board: Cell[][] = [];

  ngOnInit(): void {
    this.initializeBoard();
  }
  onCellClick(nextCell: Cell) {
    const turn = this._turnSubject.value;
    const isHandleSelected = nextCell.piece != null && nextCell.piece.color === turn;
    if (isHandleSelected) {
      this.select(nextCell);
      return;
    }

    const prevCell = this._selectedCellSubject.value;
    const isHandleMove =
      prevCell !== null && nextCell.piece === null && nextCell.inMoveRange;
    if (isHandleMove) {
      this.move(prevCell, nextCell);
      this.nextTurn();
      return;
    }
  }

  isOccupied(square: Cell): boolean {
    return square.piece !== null;
  }

  isInMoveRange(square: Cell): boolean {
    return square.inMoveRange;
  }

  select(selectedCell: Cell): void {
    const prevCell = this._selectedCellSubject.value;
    if (prevCell) {
      prevCell.unselect();
      this.clearMoveRange(prevCell);
    }
    selectedCell.select();
    this.applyMoveRange(selectedCell);
    this._selectedCellSubject.next(selectedCell);
  }

  move(from: Cell, to: Cell): void {
    from.unselect();
    this.clearMoveRange(from);
    const piece = from.piece;
    from.piece = null;
    to.piece = piece;
  }

  getCell(position: Coords): Cell {
    return this.board[position.x][position.y];
  }

  nextTurn() {
    this._turnSubject.next(
      this._turnSubject.value === Color.White ? Color.Black : Color.White
    );
    this._selectedCellSubject.next(null);
  }

  private initializeBoard() {
    for (const i of Array.from(range(0, 7))) {
      this.board[i] = [];
      for (const j of Array.from(range(0, 7))) {
        this.board[i][j] = new Cell({ x: i, y: j });
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
  }

  private clearMoveRange(square: Cell) {
    this._setMoveRange(square, false);
  }

  private applyMoveRange(square: Cell): void {
    this._setMoveRange(square, true);
  }

  private _setMoveRange(square: Cell, value: boolean): void {
    if (square) {
      const prevMoves = square.getMoves(this.board);
      for (const { x, y } of prevMoves) {
        this.board[x][y].inMoveRange = value;
      }
    }
  }

  private getAvailableMoves() {}
}
