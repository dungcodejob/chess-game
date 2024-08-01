import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "play",
    loadComponent: () => import("./game").then(m => m.GameComponent),
  },
  {
    path: "",
    redirectTo: "play",
    pathMatch: "full",
  },
];
