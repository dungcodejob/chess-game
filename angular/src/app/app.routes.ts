import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "play",
    loadComponent: () => import("./play").then(m => m.PlayComponent),
  },
  {
    path: "",
    redirectTo: "play",
    pathMatch: "full",
  },
];
