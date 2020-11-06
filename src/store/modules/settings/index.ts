import { Module, VuexModule, getModule, Mutation } from 'vuex-module-decorators';
import store from '@/store'
import { SettingsState, GameSettings, GameMode } from './types';

@Module({ dynamic: true, store, name: 'settings' })
export default class Settings extends VuexModule implements SettingsState {


  version = "1.2.1";
  isShowingSettings = false;
  isShowingAbout = false;
  isShowingSeedDialog = false;

  gameSettings: GameSettings = {
    newGameOnMistakeSingle: false,
    newGameOnMistakeSeeded: false,
    gameMode: GameMode.Single
  }

  private readonly settingsKey = "Settings";

  @Mutation
  SHOW_SETTINGS() {
    this.isShowingSettings = true;
    this.isShowingAbout = false;
    this.isShowingSeedDialog = false;
  }

  @Mutation
  HIDE_SETTINGS() {
    this.isShowingSettings = false;
  }

  @Mutation
  SHOW_ABOUT() {
    this.isShowingAbout = true;
    this.isShowingSettings = false;
    this.isShowingSeedDialog = false;
  }

  @Mutation
  HIDE_ABOUT() {
    this.isShowingAbout = false;
  }

  @Mutation
  SHOW_SEED_DIALOG() {
    this.isShowingSeedDialog = true;
    this.isShowingSettings = false;
    this.isShowingAbout = false;
  }

  @Mutation
  HIDE_SEED_DIALOG() {
    this.isShowingSeedDialog = false;
  }

  @Mutation
  UPDATE_GAME_SETTINGS(gameSettings: GameSettings) {
    this.gameSettings = { ...gameSettings };
    window.localStorage.setItem(this.settingsKey, JSON.stringify(this.gameSettings));
  }

  @Mutation
  LOAD_GAME_SETTINGS() {
    const settingsStr = window.localStorage.getItem(this.settingsKey);
    if (settingsStr === null) {
      return;
    }

    const loadedSettings = JSON.parse(settingsStr) as GameSettings;
    this.gameSettings = Object.assign(this.gameSettings, loadedSettings);
  }

  @Mutation
  SET_GAME_MODE(gameMode: GameMode) {
    this.gameSettings.gameMode = gameMode;
    window.localStorage.setItem(this.settingsKey, JSON.stringify(this.gameSettings));
  }

}

export const SettingsModule = getModule(Settings);