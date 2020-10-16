import { Module, VuexModule, getModule, Mutation } from 'vuex-module-decorators';
import store from '@/store'
import { GameState, Phase, GameNumber } from './types';

@Module({ dynamic: true, store, name: 'game' })
export default class Game extends VuexModule implements GameState {
  phase = Phase.Inactive;
  numbers = [] as GameNumber[];

  constructor(module: Game) {
    super(module);
    for (let i = 1; i <= 10; i++) {
      this.numbers.push({
        number: i,
        clicked: false
      })
    }
  }

  timers: { oneThroughTenMs?: number | undefined; overallMs?: number | undefined } = {};

  get nextNumber(): number {
    const highestNumberSoFar = Math.max(0,
      ...(this.numbers
        .filter((n) => n.clicked)
        .map(n => n.number)))
    return highestNumberSoFar + 1;
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
  }

  @Mutation
  CLICK_NUMBER(number: number) {
    const gameNumber = this.numbers.find((x) => x.number == number);

    if (!gameNumber) {
      return;
    }

    // Unfortunately we have to duplicate this logic since it's not possible to call getters from mutations
    const nextNumber = Math.max(0,
      ...(this.numbers
        .filter((n) => n.clicked)
        .map(n => n.number))) + 1

    if (number == nextNumber) {
      if (number == 1) {
        this.timers.oneThroughTenMs = Date.now();
      }
      gameNumber.clicked = true;

      // Win condition
      if (this.numbers.every((n) => n.clicked)) {
        // TODO do stuff
        this.phase = Phase.Inactive;
      }
      return true;
    } else {
      return;
    }
  }

  @Mutation
  RESET_PROGRESS() {
    this.numbers = this.numbers.map(number => ({
      ...number,
      clicked: false
    }))
  }

}

export const GameModule = getModule(Game);