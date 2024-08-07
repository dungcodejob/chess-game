import {
  animate,
  AnimationEvent,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { NgClass } from "@angular/common";
import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
  Type,
} from "@angular/core";
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
import { range } from "@shared/utils";
import { BehaviorSubject } from "rxjs";
import { GameBoardFacade } from "./game-board.facade";
import { GameBoardStore } from "./game-board.store";

enum MoveAnimationState {
  Idle = "idle",
  Moving = "moving",
}

@Component({
  selector: "app-game-board",
  standalone: true,
  imports: [NgClass],
  templateUrl: "./game-board.component.html",
  styleUrl: "./game-board.component.css",
  providers: [GameBoardFacade, GameBoardStore],
  animations: [
    trigger("move", [
      state(MoveAnimationState.Idle, style({ transform: "translate(0, 0)" })),
      state(
        MoveAnimationState.Moving,
        style({ transform: "translate({{x}}px,{{y}}px" }),
        {
          params: { x: 0, y: 0 },
        }
      ),
      transition(`${MoveAnimationState.Idle} => ${MoveAnimationState.Moving}`, [
        animate("500ms ease-in-out"),
      ]),
    ]),
  ],
})
export class GameBoardComponent implements OnInit {
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _facade = inject(GameBoardFacade);

  readonly $boards = this._facade.$boards;
  readonly $selectedId = this._facade.$selectedId;
  readonly $moveRangeIds = this._facade.$moveRangeIds;

  readonly $moveAnimationPosition = signal<{
    from: Coords;
    to: Coords;
  } | null>(null);
  readonly $moveAnimationState = computed(() =>
    this.$moveAnimationPosition() !== null
      ? MoveAnimationState.Moving
      : MoveAnimationState.Idle
  );

  get moveAnimationPosition() {
    return this.$moveAnimationPosition();
  }

  readonly $moveAnimationTransform = computed(() => {
    const move = this.$moveAnimationPosition();
    if (move) {
      console.log(move);
      const y = (move.to.x - move.from.x) * 64;
      const x = (move.to.y - move.from.y) * 64;
      console.log(`translate(${x}px,${y}px`);
      return {
        x,
        y,
      };
    }

    return { x: 0, y: 0 };
  });

  board: Cell[][] = [];

  ngOnInit(): void {
    this._facade.initialize();
  }
  onCellClick(nextCell: Cell) {

    const turn = this._facade.$turn();
    const isHandleSelected = nextCell.piece != null && nextCell.piece.color === turn;
    if (isHandleSelected) {
      this._facade.select(nextCell.id);
      return;
    }

    const selectedId = this._facade.$selectedId();
    const moveRangeIds = this._facade.$moveRangeIds();
    const isHandleMove = selectedId !== null && moveRangeIds.includes(nextCell.id);
    if (isHandleMove) {
      const fromPiece = this._facade.$selectedPiece()!;
      const from = Cell.idToPosition(selectedId);
      const to = nextCell.position;
      const toPiece = nextCell.piece;

      // this.$moveAnimationPosition.set({ from: prevCell.position, to: nextCell.position });
      this._facade.move({ fromPiece, from, to, toPiece })
      return;
    }
  }

  onMoveAnimationDone(event: AnimationEvent) {
    // const move = this.$moveAnimationPosition();
    // if (move) {
    //   const { from, to } = move;
    //   const fromCell = this.getCell(from);
    //   const toCell = this.getCell(to);
    //   this.move(fromCell, toCell);
    //   this.nextTurn();
    //   this.$moveAnimationPosition.set(null);
    // }
  }

  // isOccupied(square: Cell): boolean {
  //   return square.piece !== null;
  // }

  // isInMoveRange(square: Cell): boolean {
  //   return square.inMoveRange;
  // }

  // select(selectedCell: Cell): void {
  //   const prevCell = this._selectedCellSubject.value;
  //   if (prevCell) {
  //     prevCell.unselect();
  //     this.clearMoveRange(prevCell);
  //   }
  //   selectedCell.select();
  //   this.applyMoveRange(selectedCell);
  //   this._selectedCellSubject.next(selectedCell);
  // }

  // move(from: Cell, to: Cell): void {
  //   from.unselect();

  //   const piece = from.piece;
  //   from.piece = null;
  //   to.piece = piece;
  // }

  // getCell(position: Coords): Cell {
  //   return this.board[position.x][position.y];
  // }

  // private initializeBoard() {
  //   for (const i of Array.from(range(0, 7))) {
  //     this.board[i] = [];
  //     for (const j of Array.from(range(0, 7))) {
  //       this.board[i][j] = new Cell((i * 8 + j).toString(), { x: i, y: j });
  //     }
  //   }

  //   const pieceClasses: Type<Piece>[] = [
  //     Rook,
  //     Knight,
  //     Bishop,
  //     Queen,
  //     King,
  //     Bishop,
  //     Knight,
  //     Rook,
  //   ];

  //   for (const i of Array.from(range(0, 7))) {
  //     // Place the pieces on the 1st and 8th ranks
  //     this.board[0][i].piece = new pieceClasses[i](Color.Black);
  //     this.board[7][i].piece = new pieceClasses[i](Color.White);
  //     // Place the pawns on the 2nd and 7th ranks
  //     this.board[1][i].piece = new Pawn(Color.Black);
  //     this.board[6][i].piece = new Pawn(Color.White);
  //   }
  // }

  // private clearMoveRange(square: Cell) {
  //   this._setMoveRange(square, false);
  // }

  // private applyMoveRange(square: Cell): void {
  //   this._setMoveRange(square, true);
  // }

  // private _setMoveRange(square: Cell, value: boolean): void {
  //   if (square) {
  //     const prevMoves = square.getMoves(this.board);
  //     for (const { x, y } of prevMoves) {
  //       this.board[x][y].inMoveRange = value;
  //     }
  //   }
  // }

  // private getAvailableMoves() { }
}
