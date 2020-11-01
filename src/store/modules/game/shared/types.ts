export interface GameState {
  phase: Phase;
  numbers: GameNumber[];
  timerDataOverall: TimerData;
  timerDataOneThroughTen: TimerData;
}

export enum Phase {
  Inactive = 1,
  Active
}

export interface GameNumber {
  number: number;
  clicked: boolean;
}

export interface TimerData {
  timerType: TimerType;
  startTimeMs: number | null;
  lastTimeMs: number | null;
  times: Array<number|null>;

  recordTime(timeMs: number): void;
}

export class TimerDataImp implements TimerData {
  times: Array<number|null> = [null, null, null, null, null];
  startTimeMs: number | null = null;
  lastTimeMs: number | null = null;

  constructor(public timerType: TimerType) {
  }

  recordTime(now: number): void {
    if (!this.startTimeMs) {
      throw "recordTime(): startTimeMs is null"
    }

    const elapsedTimeMs = now - this.startTimeMs;
    this.lastTimeMs = elapsedTimeMs;
    this.startTimeMs = null;

    this.times.push(elapsedTimeMs);
    this.times.sort((a, b) => {
      if (a == null) {
        return 1;
      } else if (b == null) {
        return -1;
      } else {
        return a - b;
      }
    });
    this.times = this.times.slice(0, 5);
  }
}

export enum TimerType {
  Overall = 1,
  OneThroughTen
}
