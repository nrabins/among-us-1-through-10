import { Module, VuexModule, getModule, Mutation } from 'vuex-module-decorators';
import store from '@/store'
import { GameState, Phase, GameNumber, TimerData, TimerType, TimerDataImp } from './types';

@Module({ dynamic: true, store, name: 'game' })
export default class Game extends VuexModule implements GameState {
  phase = Phase.Inactive;
  numbers = [] as GameNumber[];
  timerDataOverall = new TimerDataImp(TimerType.Overall)
  timerDataOneThroughTen = new TimerDataImp(TimerType.OneThroughTen);

  // public now = Date.now();

  constructor(module: Game) {
    super(module);
    for (let i = 1; i <= 10; i++) {
      this.numbers.push({
        number: i,
        clicked: false
      })
    }
  }

  // @Mutation
  // UPDATE_NOW() {
  //   this.now = Date.now();
  // }

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

      }
    }
  }

  @Mutation
  RESET_PROGRESS() {
    this.numbers.forEach(number => number.clicked = false);
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

export const GameModule = getModule(Game);