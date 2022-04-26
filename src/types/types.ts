export enum Players {
  ONE = "one",
  TWO = "two",
}

export type BoardCell = Players | null;
export type BoardRow = BoardCell[];
export type Board = BoardRow[];
