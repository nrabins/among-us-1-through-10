<template>
  <component :is="gameBoardName" class="game-board" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { SettingsModule } from "@/store/modules/settings";
import { GameMode } from "@/store/modules/settings/types";

import SingleGameBoard from "@/components/game/single/SingleGameBoard.vue";
import SeededGameBoard from "@/components/game/seeded/SeededGameBoard.vue";

@Component({
  components: {
    SingleGameBoard,
    SeededGameBoard,
  },
})
export default class GameBoard extends Vue {
  get gameBoardName() {
    const gameMode = SettingsModule.gameSettings.gameMode;
    switch (gameMode) {
      case GameMode.Single:
        return "SingleGameBoard";
      case GameMode.Seeded:
        return "SeededGameBoard";
      default:
        throw `Unrecognized game mode in GameBoard: ${gameMode}`;
    }
  }
}
</script>

<style lang="scss" scoped>
.game-board {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>