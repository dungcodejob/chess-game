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
  readonly $turn = this._facade.$turn;

  readonly $moveAnimationPosition = signal<Move | null>(null);
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

      this.$moveAnimationPosition.set({ fromPiece, from, to, toPiece });
      // this._facade.move({ fromPiece, from, to, toPiece });
      return;
    }
  }

  onMoveAnimationDone(event: AnimationEvent) {
    const move = this.$moveAnimationPosition();
    if (move && event.toState === MoveAnimationState.Moving) {
      this.$moveAnimationPosition.set(null);
      this._facade.move(move);
    }
  }
}
