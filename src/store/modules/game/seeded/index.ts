import { getSeededTrials } from './data';
import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store'
import { SeededGameState, TimerDataImp, TimerType, isValidSeed, isValidNumberOfTrials } from './types';
import { GameNumber, Phase } from '../shared/types';

@Module({ dynamic: true, namespaced: true, store, name: 'seeded' })
export default class SeededGame extends VuexModule implements SeededGameState {
  private readonly defaultSeed = { seed: "OGBOMOSHO", numberOfTrials: 5 };
  phase = Phase.Inactive;
  timerDataOverall = new TimerDataImp(TimerType.Overall)

  seed = this.defaultSeed.seed;
  numberOfTrials = this.defaultSeed.numberOfTrials;

  currentTrialIndex = 0;
  trials = [] as GameNumber[][];

  nextNumber = 1;

  hasCompletedTrial = false;

  private readonly bestTimesKey = "SeededBestTimes";
  private readonly lastSeedKey = "LastSeed";

  constructor(module: SeededGame) {
    super(module);
    this.trials = [[]] as GameNumber[][];
    for (let i = 1; i <= 10; i++) {
      this.trials[0].push({
        number: i,
        clicked: false
      })
    }
  }

  @Mutation
  SET_SEED(payload: { seed: string; numberOfTrials: number }) {
    payload.seed = payload.seed.toUpperCase().trim();

    if (!isValidSeed(payload.seed)) {
      payload.seed = this.defaultSeed.seed
    }

    if (!isValidNumberOfTrials(payload.numberOfTrials)) {
      payload.numberOfTrials = this.defaultSeed.numberOfTrials;
    }

    this.seed = payload.seed;
    this.numberOfTrials = payload.numberOfTrials;
    this.hasCompletedTrial = false;

    window.localStorage.setItem(this.lastSeedKey, JSON.stringify({ seed: this.seed, numberOfTrials: this.numberOfTrials }))
  }

  @Mutation
  LOAD_SEED() {
    let seed = { ... this.defaultSeed };

    const localStorageSeedStr = window.localStorage.getItem(this.lastSeedKey);
    if (localStorageSeedStr) {
      const localStorageSeed = JSON.parse(localStorageSeedStr) as { seed: string; numberOfTrials: number };
      if (isValidSeed(localStorageSeed.seed) && isValidNumberOfTrials(localStorageSeed.numberOfTrials)) {
        seed = localStorageSeed;
      }
    }

    this.seed = seed.seed;
    this.numberOfTrials = seed.numberOfTrials;
  }

  @Mutation
  LOAD_SEEDED_BEST_TIMES() {
    const dataStr = window.localStorage.getItem(this.bestTimesKey);
    if (dataStr === null) {
      return;
    }

    const data = JSON.parse(dataStr) as {
      overall: TimerDataImp;
    };

    this.timerDataOverall.seededTimes = data.overall.seededTimes;
  }

  @Mutation
  RESET_DATA() {
    window.localStorage.removeItem(this.bestTimesKey);
    this.timerDataOverall.seededTimes = [];
    this.seed = this.defaultSeed.seed;
    this.numberOfTrials = this.defaultSeed.numberOfTrials;
    localStorage.removeItem(this.lastSeedKey);
  }

  @Mutation
  NEW_GAME() {
    this.phase = Phase.Inactive;

    this.trials = getSeededTrials(this.numberOfTrials, this.seed)
      .map(trial => trial.map(number => ({
        number,
        clicked: false
      })));
    this.nextNumber = 1;
    this.currentTrialIndex = 0;

    this.timerDataOverall.lastTimeMs = null;
    this.timerDataOverall.startTimeMs = null;
  }

  @Mutation
  START_GAME() {
    this.phase = Phase.Active;
    this.timerDataOverall.lastTimeMs = null;
    this.timerDataOverall.startTimeMs = Date.now();
  }

  @Mutation
  CLICK_NUMBER(number: number) {
    const currentTrial = this.trials[this.currentTrialIndex];
    if (!currentTrial) {
      throw `No trial for index ${this.currentTrialIndex}`
    }
    const gameNumber = currentTrial.find((x) => x.number == number);

    if (!gameNumber) {
      return;
    }

    if (number == this.nextNumber) {

      this.nextNumber++;
      gameNumber.clicked = true;

      if (currentTrial.every((n) => n.clicked)) {
        // Trial is complete
        if (this.currentTrialIndex == this.trials.length - 1) {
          // This was the last trial, game over logic
          this.phase = Phase.Inactive;
          this.hasCompletedTrial = true;

          this.timerDataOverall.recordTime(Date.now(), this.seed, this.numberOfTrials);
          window.localStorage.setItem(this.bestTimesKey, JSON.stringify({
            overall: this.timerDataOverall,
          }));
        } else {
          this.currentTrialIndex++;
          this.nextNumber = 1;
        }
      }
    }
  }

  get currentTrial(): GameNumber[] {
    const currentTrial = this.trials[this.currentTrialIndex];
    if (!currentTrial) {
      throw `currentTrial(): No trial for index ${this.currentTrialIndex}`;
    }
    return currentTrial;
  }

  @Mutation
  RESET_PROGRESS() {
    const currentTrial = this.trials[this.currentTrialIndex];
    if (!currentTrial) {
      throw `No trial for index ${this.currentTrialIndex}`
    }
    currentTrial.forEach(number => number.clicked = false);
    this.nextNumber = 1;
  }

  @Action
  loadData() {
    this.context.commit('LOAD_SEED');
    this.context.commit('LOAD_SEEDED_BEST_TIMES');
  }

  @Action
  setSeed(payload: { seed: string; numberOfTrials: number }) {
    this.context.commit('SET_SEED', payload);
    this.context.commit('NEW_GAME');
  }
}

export const SeededGameModule = getModule(SeededGame);