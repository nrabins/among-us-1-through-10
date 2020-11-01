import { Module, VuexModule, getModule, Mutation } from 'vuex-module-decorators';
import store from '@/store'
import { SettingsState, GameSettings } from './types';

@Module({ dynamic: true, store, name: 'settings' })
export default class Settings extends VuexModule implements SettingsState {
  version = "1.1.0";
  isShowingSettings = false;
  isShowingAbout = false;

  gameSettings: GameSettings = {
    newGameOnMistake: false,
    isSeeded: false
  }

  private readonly settingsKey = "Settings";

  @Mutation
  SHOW_SETTINGS() {
    this.isShowingSettings = true;
    this.isShowingAbout = false;
  }

  @Mutation
  HIDE_SETTINGS() {
    this.isShowingSettings = false;
  }

  @Mutation
  SHOW_ABOUT() {
    this.isShowingAbout = true;
    this.isShowingSettings = false;
  }

  @Mutation
  HIDE_ABOUT() {
    this.isShowingAbout = false;
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

    this.gameSettings = JSON.parse(settingsStr) as GameSettings;
  }

}

export const SettingsModule = getModule(Settings);