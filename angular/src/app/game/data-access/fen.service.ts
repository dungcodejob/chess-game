import { Injectable } from "@angular/core";
import { Coords, Move } from "@shared/models";

@Injectable()
export class FENService {
  coordsToFEN(coords: Coords): string {
    const files = "abcdefgh";
    const ranks = "12345678";
    return `${files[coords.x]}${ranks[7 - coords.y]}`;
  }

  moveToCoordinates(move: Move): string;
  moveToCoordinates(move: Move[]): string[];
  moveToCoordinates(move: Move | Move[]): string | string[] {
    if (Array.isArray(move)) {
      return move.map(item => this.moveToCoordinates(item));
    }

    const from = this.coordsToFEN(move.from);
    const to = this.coordsToFEN(move.to);
    return `${from}-${to}`;
  }
}
