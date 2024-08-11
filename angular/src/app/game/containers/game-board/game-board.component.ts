import {
  animate,
  AnimationEvent,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { NgClass } from "@angular/common";
import { Component, computed, DestroyRef, inject, OnInit, signal } from "@angular/core";
import { Cell, Move } from "@shared/models";
import { GameBoardFacade } from "./game-board.facade";

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
  providers: [GameBoardFacade],
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
  readonly $turn = this._facade.$turn;
  readonly $squareSize = signal(64);

  readonly $moveAnimationPosition = signal<Move | null>(null);
  readonly $moveAnimationState = computed(() =>
    this.$moveAnimationPosition() !== null
      ? MoveAnimationState.Moving
      : MoveAnimationState.Idle
  );
  readonly $moveAnimationTransform = computed(() => {
    const move = this.$moveAnimationPosition();
    if (move) {
      const y = (move.to.x - move.from.x) * this.$squareSize();
      const x = (move.to.y - move.from.y) * this.$squareSize();

      return {
        x,
        y,
      };
    }

    return { x: 0, y: 0 };
  });

  ngOnInit(): void {}
  onCellClick(nextCell: Cell) {
    const canSelectSquare = this.canSelectSquare(nextCell);
    if (canSelectSquare) {
      this._facade.select(nextCell.id);
      return;
    }

    const canMoveSquare = this.canMoveSquare(nextCell);
    if (canMoveSquare) {
      const prevCell = this._facade.$selectedCell()!;
      const fromPiece = prevCell.piece!;
      const from = prevCell.position;
      const to = nextCell.position;
      const toPiece = nextCell.piece;

      this.$moveAnimationPosition.set({
        movePiece: fromPiece,
        from,
        to,
        capturedPiece: toPiece,
      });
      return;
    }
  }

  onMoveAnimationStart(event: AnimationEvent) {
    // if (event.toState === MoveAnimationState.Moving) {
    //   this._facade.unselect();
    // }
  }

  onMoveAnimationDone(event: AnimationEvent) {
    const move = this.$moveAnimationPosition();
    if (move && event.toState === MoveAnimationState.Moving) {
      this.$moveAnimationPosition.set(null);
      this._facade.move(move);
    }
  }

  private canSelectSquare(cell: Cell) {
    const turn = this._facade.$turn();
    return cell.piece != null && cell.piece.color === turn;
  }

  private canMoveSquare(cell: Cell) {
    const selectedId = this._facade.$selectedId();
    const moveRangeIds = this._facade.$moveRangeIds();
    return selectedId !== null && moveRangeIds.includes(cell.id);
  }
}
