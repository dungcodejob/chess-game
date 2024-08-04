import { inject, Injectable } from "@angular/core";
import { SettingStore } from "./setting.store";

@Injectable({ providedIn: "root" })
export class SettingFacade {
  private readonly _settingStore = inject(SettingStore);

  readonly setPiecesStyle = this._settingStore.setPiecesStyle;
  readonly setBoardColor = this._settingStore.setBoardColor;
}
