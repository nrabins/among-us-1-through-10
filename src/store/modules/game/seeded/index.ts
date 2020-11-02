import { dummyData } from './data';
import { Module, VuexModule, getModule, Mutation } from 'vuex-module-decorators';
import store from '@/store'
import { SeededGameState, TimerData, TimerDataImp, TimerType } from './types';
import { GameNumber, Phase } from '../shared/types';

@Module({ dynamic: true, store, name: 'seeded' })
export default class SeededGame extends VuexModule implements SeededGameState {
  phase = Phase.Inactive;
  numbers = [] as GameNumber[];
  timerDataOverall = new TimerDataImp(TimerType.Overall)
  
  isSeededRun = true;
  seededRunActiveIndex = 0;
  seededRunTrials = dummyData;

  private readonly bestTimesKey = "BestTimes";

  constructor(module: SeededGame) {
    super(module);
    for (let i = 1; i <= 10; i++) {
      this.numbers.push({
        number: i,
        clicked: false
      })
    }
  }

  @Mutation
  LOAD_DATA() {
    const dataStr = window.localStorage.getItem(this.bestTimesKey);
    if (dataStr === null) {
      return;
    }

    const data = JSON.parse(dataStr) as {
      overall: Array<number | null>;
      oneThroughTen: Array<number | null>;
    };

    this.timerDataOverall.times = data.overall;
  }

  @Mutation
  RESET_DATA() {
    window.localStorage.removeItem(this.bestTimesKey);
    this.timerDataOverall.times = [null, null, null, null, null];
  }

  @Mutation
  SET_INACTIVE() {
    this.phase = Phase.Inactive;
    this.timerDataOverall.lastTimeMs = null;
    this.timerDataOverall.startTimeMs = null;
  }

  @Mutation
  NEW_GAME() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    this.numbers = numbers.map((i) => ({
      number: i,
      clicked: false,
    }));

    this.phase = Phase.Active;

    this.timerDataOverall.lastTimeMs = null;
    this.timerDataOverall.startTimeMs = Date.now();

  }

  @Mutation
  CLICK_NUMBER(number: number) {
    const gameNumber = this.numbers.find((x) => x.number == number);

    if (!gameNumber) {
      return;
    }

    // Unfortunately we have to duplicate this logic since (AFAIK)
    // it's not possible to call getters from mutations
    const nextNumber = Math.max(0,
      ...(this.numbers
        .filter((n) => n.clicked)
        .map(n => n.number))) + 1

    if (number == nextNumber) {
      const now = Date.now()

      gameNumber.clicked = true;

      if (this.numbers.every((n) => n.clicked)) {
        // Game-over handling
        this.phase = Phase.Inactive;

        this.timerDataOverall.recordTime(now);

        // window.localStorage.setItem(this.bestTimesKey, JSON.stringify({
        //   overall: this.timerDataOverall.times,
        // }));
      }
    }
  }

  @Mutation
  RESET_PROGRESS() {
    this.numbers.forEach(number => number.clicked = false);
  }

  // get nextNumber(): number {
  //   const highestNumberSoFar = Math.max(0,
  //     ...(this.numbers
  //       .filter((n) => n.clicked)
  //       .map(n => n.number)))
  //   return highestNumberSoFar + 1;
  // }

  // get timerDataForTimerType(): (timerType: TimerType) => TimerData {
  //   return (timerType: TimerType) => {
  //     switch (timerType) {
  //       case TimerType.Overall: return this.timerDataOverall;
  //       default:
  //         throw `timerDataForTimerType(): Unrecognized TimerType: ${timerType}`;
  //     }
  //   }
  // }
}

export const SeededGameModule = getModule(SeededGame);