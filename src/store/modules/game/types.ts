export interface GameState {
  phase: Phase;
  numbers: GameNumber[];
  timers: {
    oneThroughTenMs?: number;
    overallMs?: number;
  };
}

export enum Phase {
  Inactive = 1,
  Active
}

export interface GameNumber {
  number: number;
  clicked: boolean;
}
