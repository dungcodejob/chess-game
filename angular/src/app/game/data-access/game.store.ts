import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { ChessChar, Color, Move } from "@shared/models";


enum Level {
  Beginner = 1,
  Intermediate = 2,
  Advanced = 3,
  Expert = 4,
  Master = 5,
  Default = Intermediate,
}

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
  moves: Move[];
  level: Level;
  playerColor: Color;
}

const initialState: GameState = {
  turn: Color.White,
  halfMoveClock: 0,
  fullMoveNumber: 1,
  enPassantTarget: null,
  castlingAvailabilities: [
    ChessChar.WhiteKing,
    ChessChar.WhiteQueen,
    ChessChar.BlackKing,
    ChessChar.BlackQueen,
  ],
  moves: [],
  level: Level.Default,
  playerColor: Color.Default,
};

export const GameStore = signalStore(
  withState(initialState),
  withMethods(store => {

    const checkHalfMove = (move: Move) => {
      const { fromPiece, toPiece } = move;
      if (!toPiece) {
        return false;
      }
      if (fromPiece.char === ChessChar.WhitePawn || fromPiece.char === ChessChar.BlackPawn) {
        return true;
      }

      return false;
    }

    return {

      startGame: (playerColor: Color, level: Level) => {
        patchState(store, {
          turn: Color.White,
          playerColor,
          level
        });
      },

      addMove: (move: Move) => {

        const isHalfMove = checkHalfMove(move);
        const halfMoveClock = isHalfMove ? store.halfMoveClock() + 1 : store.halfMoveClock();

        return patchState(store, {
          moves: [...store.moves(), move],
          turn: store.turn() === Color.White ? Color.Black : Color.White,
          fullMoveNumber: store.fullMoveNumber() + 1,
          halfMoveClock,
        })
      },
      resetHalfMoveClock: () => patchState(store, { halfMoveClock: 0 }),
    }
  })
);
