import { GameNumber, Phase } from '../shared/types';

export interface SeededGameState {
  phase: Phase;
  timerDataOverall: TimerData;
  trials: GameNumber[][];
}


export interface TimerData {
  timerType: TimerType;
  startTimeMs: number | null;
  lastTimeMs: number | null;
  seededTimes: Array<SeededTimeRecord>;

  recordTime(timeMs: number, seed: string, numberOfTrials: number): void;
}

export class TimerDataImp implements TimerData {
  startTimeMs: number | null = null;
  lastTimeMs: number | null = null;

  seededTimes = [] as Array<SeededTimeRecord>;

  constructor(public timerType: TimerType) {
  }

  recordTime(now: number, seed: string, numberOfTrials: number): void {
    if (!this.startTimeMs) {
      throw "recordTime(): startTimeMs is null"
    }

    const elapsedTimeMs = now - this.startTimeMs;
    this.lastTimeMs = elapsedTimeMs;
    this.startTimeMs = null;

    let timesForSeed = this.seededTimes.find(st => st.seed == seed && st.numberOfTrials == numberOfTrials)
    if (!timesForSeed) {
      timesForSeed = {
        seed,
        numberOfTrials,
        times: [null, null, null, null, null]
      }
      this.seededTimes.push(timesForSeed);
    }

    timesForSeed.times.push(elapsedTimeMs);
    timesForSeed.times.sort((a, b) => {
      if (a == null) {
        return 1;
      } else if (b == null) {
        return -1;
      } else {
        return a - b;
      }
    });
    timesForSeed.times = timesForSeed.times.slice(0, 5);
  }
}

export enum TimerType {
  Overall = 1,
}

export interface SeededTimeRecord {
  seed: string;
  numberOfTrials: number;
  times: Array<number | null>;
}

// Utility
export const isValidSeed = (seed: string) => {
  return seed.length > 0 && seed.length <= 10;
}

export const isValidNumberOfTrials = (numberOfTrials: number) => {
  return numberOfTrials >= 2 && numberOfTrials <= 100
}