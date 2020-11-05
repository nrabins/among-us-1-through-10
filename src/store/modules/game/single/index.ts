import { Module, VuexModule, getModule, Mutation } from 'vuex-module-decorators';
import store from '@/store'
import { Phase, GameNumber} from '../shared/types';
import { SingleGameState, TimerData, TimerDataImp, TimerType } from './types';

@Module({ dynamic: true, namespaced: true, store, name: 'single' })
export default class SingleGame extends VuexModule implements SingleGameState {
  phase = Phase.Inactive;
  numbers = [] as GameNumber[];
  timerDataOverall = new TimerDataImp(TimerType.Overall)
  timerDataOneThroughTen = new TimerDataImp(TimerType.OneThroughTen);

  private readonly bestTimesKey = "BestTimes";

  constructor(module: SingleGame) {
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
    this.timerDataOneThroughTen.times = data.oneThroughTen;
  }

  @Mutation
  RESET_DATA() {
    window.localStorage.removeItem(this.bestTimesKey);
    this.timerDataOverall.times = [null, null, null, null, null];
    this.timerDataOneThroughTen.times = [null, null, null, null, null];
  }

  @Mutation
  SET_INACTIVE() {
    this.phase = Phase.Inactive;
    this.timerDataOverall.lastTimeMs = null;
    this.timerDataOverall.startTimeMs = null;
    this.timerDataOneThroughTen.lastTimeMs = null;
    this.timerDataOneThroughTen.startTimeMs = null;
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

    this.timerDataOneThroughTen.lastTimeMs = null;
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

      if (number == 1) {
        this.timerDataOneThroughTen.startTimeMs = now;
      }
      gameNumber.clicked = true;

      if (this.numbers.every((n) => n.clicked)) {
        // Game-over handling
        this.phase = Phase.Inactive;

        this.timerDataOverall.recordTime(now);
        this.timerDataOneThroughTen.recordTime(now);

        window.localStorage.setItem(this.bestTimesKey, JSON.stringify({
          overall: this.timerDataOverall.times,
          oneThroughTen: this.timerDataOneThroughTen.times
        }));
      }
    }
  }

  @Mutation
  RESET_PROGRESS() {
    this.numbers.forEach(number => number.clicked = false);
    this.timerDataOneThroughTen.startTimeMs = null;
  }

  get nextNumber(): number {
    const highestNumberSoFar = Math.max(0,
      ...(this.numbers
        .filter((n) => n.clicked)
        .map(n => n.number)))
    return highestNumberSoFar + 1;
  }

  get timerDataForTimerType(): (timerType: TimerType) => TimerData {
    return (timerType: TimerType) => {
      switch (timerType) {
        case TimerType.Overall: return this.timerDataOverall;
        case TimerType.OneThroughTen: return this.timerDataOneThroughTen;
        default:
          throw `timerDataForTimerType(): Unrecognized TimerType: ${timerType}`;
      }
    }
  }
}

export const SingleGameModule = getModule(SingleGame);