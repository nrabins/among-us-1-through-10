import { Module, VuexModule, getModule, Mutation } from 'vuex-module-decorators';
import store from '@/store'
import { SettingsState } from './types';

@Module({ dynamic: true, store, name: 'settings' })
export default class Settings extends VuexModule implements SettingsState {
  isShowingSettings = false;
  isShowingAbout = false;
  version = "1.1.0";

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
}

export const SettingsModule = getModule(Settings);