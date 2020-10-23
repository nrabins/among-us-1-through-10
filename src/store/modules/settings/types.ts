export interface SettingsState {
  isShowingSettings: boolean;
  isShowingAbout: boolean;
  gameSettings: GameSettings;
}

export interface GameSettings {
  newGameOnMistake: boolean;
}