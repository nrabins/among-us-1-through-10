export interface SettingsState {
  isShowingSettings: boolean;
  isShowingAbout: boolean;
  gameSettings: GameSettings;
}

export interface GameSettings {
  newGameOnMistakeSingle: boolean;
  newGameOnMistakeSeeded: boolean;
  gameMode: GameMode;
}

export enum GameMode {
  Single,
  Seeded
}