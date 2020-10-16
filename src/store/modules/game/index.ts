import { Module, VuexModule, getModule, Mutation } from 'vuex-module-decorators';
import store from '@/store'
import { GameState } from './types';

@Module({ dynamic: true, store, name: 'game'})
export default class Game extends VuexModule implements GameState {
  counter = 21;

  @Mutation
  INCREMENT() {
    this.counter++;
  }
}

export const GameModule = getModule(Game);