import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";

enum PiecesStyle {
  Cburnett,
  Default = Cburnett,
}

enum BoardColor {
  Gray,
  Default = Gray,
}

interface SettingState {
  piecesStyle: PiecesStyle;
  boardColor: BoardColor;
}

const initialState: SettingState = {
  piecesStyle: PiecesStyle.Default,
  boardColor: BoardColor.Default,
};

export const SettingStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withMethods(store => ({
    setPiecesStyle: (style: PiecesStyle) => patchState(store, { piecesStyle: style }),
    setBoardColor: (color: BoardColor) => patchState(store, { boardColor: color }),
  }))
);
