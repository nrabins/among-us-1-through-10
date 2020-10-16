import { Module, VuexModule, getModule, Mutation } from 'vuex-module-decorators';
import store from '@/store'
import { GameState, Phase, GameNumber } from './types';

@Module({ dynamic: true, store, name: 'game'})
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
  timers: { oneThroughTenMs: number | null; overallMs?: number | null | undefined; };
  
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
  }

  @Mutation
  CLICK_NUMBER(number: number) {
    const gameNumber = this.numbers.find((x) => x.number == number);

    if (!gameNumber) {
      return;
    }

    const highestNumberSoFar = Math.max(
      0,
      ...this.numbers.filter((n) => n.clicked).map((n) => n.number)
    );

    if (number == highestNumberSoFar + 1) {
      if (number == 1) {
        this.$emit('firstClick');
        this.timers.oneThroughTenMs = Date.now();
      }
      gameNumber.clicked = true;

      // Win condition
      if (this.numbers.every((n) => n.clicked)) {
        this.hasWon = true;
        this.$emit('gameEnd');
      }
    } else {
      this.clearProgress();
    }
  }
  
}

export const GameModule = getModule(Game);