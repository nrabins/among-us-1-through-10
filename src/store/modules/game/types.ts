export interface GameState {
  phase: Phase;
  numbers: GameNumber[];
  timers: {
    oneThroughTenMs: number | null,
    overallMs?: number | null
  }
}

export enum Phase {
  Inactive = 1,
  Active
}

export interface GameNumber {
  number: number;
  clicked: boolean;
}