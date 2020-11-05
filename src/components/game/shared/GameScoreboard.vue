<template>
  <component :is="scoreboardName" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { SettingsModule } from "@/store/modules/settings";
import { GameMode } from '@/store/modules/settings/types';

@Component
export default class GameScoreboard extends Vue {
  get scoreboardName() {
    const gameMode = SettingsModule.gameSettings.gameMode;
    switch (gameMode) {
      case GameMode.Single:
        return "SingleGameBoard";
      case GameMode.Seeded:
        return "SeededGameBoard";
      default:
        throw `Unrecognized game mode in GameScoreboard: ${gameMode}`;
    }
  }
}
</script>

<style scoped>
</style>