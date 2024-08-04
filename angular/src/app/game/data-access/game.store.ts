import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { ChessChar, Color } from "@shared/models";

type CastlingAvailability =
  | ChessChar.WhiteKing
  | ChessChar.WhiteQueen
  | ChessChar.BlackKing
  | ChessChar.BlackQueen;

interface GameState {
  turn: Color;
  castlingAvailabilities: CastlingAvailability[];
  enPassantTarget: string | null;
  halfMoveClock: number;
  fullMoveNumber: number;
}

const initialState: GameState = {
  turn: Color.Default,
  halfMoveClock: 0,
  fullMoveNumber: 1,
  enPassantTarget: null,
  castlingAvailabilities: [
    ChessChar.WhiteKing,
    ChessChar.WhiteQueen,
    ChessChar.BlackKing,
    ChessChar.BlackQueen,
  ],
};

export const GameStore = signalStore(
  withState(initialState),
  withMethods(store => ({ setTurn: (turn: Color) => patchState(store, { turn }) }))
);
