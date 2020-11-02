<template>
  <div class="container">
    <GameBoard />

    <div class="meta">
      <ScoreBoards />
      <div class="settings-container">
        <button class="settings-button" @click="showSettings">
          ⚙ Settings
        </button>
        <button class="about-button" @click="showAbout">About</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import GameBoard from "@/components/game/shared/GameBoard.vue";
import ScoreBoards from "@/components/game/shared/ScoreBoards.vue";
import { SettingsModule } from "@/store/modules/settings";

@Component({
  components: {
    GameBoard,
    ScoreBoards,
  },
})
export default class AmongUsGame extends Vue {
  showSettings() {
    SettingsModule.SHOW_SETTINGS();
  }

  showAbout() {
    SettingsModule.SHOW_ABOUT();
  }
}
</script>

<style lang="scss" scoped>
$button-text-color: #98ff9e;
$button-color: #00a141;
$button-color-hover: lighten($button-color, 7%);

.container {
  display: flex;
  align-items: center;
}


.meta {
  margin-left: 2vw;
  display: flex;
  flex-direction: column;


  $pill-border-radius: 1vw;

  .settings-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    button {
      height: 3vw;
      padding: 0vw 1vw;

      cursor: pointer;
      text-transform: uppercase;

      color: white;
      background-color: rgba(0, 0, 0, 0.308);
      border: 0.2vw solid black;
      font-size: 1vw;

      &:hover {
        color: rgb(192, 192, 192);
      }

      &:first-child {
        border-top-left-radius: $pill-border-radius;
        border-bottom-left-radius: $pill-border-radius;
        border-right: none;
      }

      &:last-child {
        border-top-right-radius: $pill-border-radius;
        border-bottom-right-radius: $pill-border-radius;
      }
    }
  }
}

</style>