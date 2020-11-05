<template>
  <div class="meta">
    <div class="settings-container">
      <button @click="onSingleClicked" :class="{ selected: isSingle }">
        Single
      </button>
      <button @click="onSeededClicked" :class="{ selected: isSeeded }">
        Seeded
      </button>
    </div>
    <ScoreBoards />
    <!-- <div v-if="isSeeded" class="settings-container">
      <button>About Seeded Runs</button>
    </div> -->
    <div class="settings-container">
      <button class="settings-button" @click="showSettings">⚙ Settings</button>
      <button class="about-button" @click="showAbout">About</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ScoreBoards from '@/components/game/shared/ScoreBoards.vue';
import { SettingsModule } from '@/store/modules/settings';
import { GameMode } from '@/store/modules/settings/types';
import { SeededGameModule } from '@/store/modules/game/seeded';
import { SingleGameModule } from '@/store/modules/game/single';

@Component({
  components: {
    ScoreBoards,
  },
})
export default class SideMeta extends Vue {
  get isSingle() {
    return SettingsModule.gameSettings.gameMode == GameMode.Single;
  }

  get isSeeded() {
    return SettingsModule.gameSettings.gameMode == GameMode.Seeded;
  }

  onSingleClicked() {
    if (this.isSeeded) {
      SeededGameModule.NEW_GAME();
      SettingsModule.SET_GAME_MODE(GameMode.Single);
    }
  }

  onSeededClicked() {
    if (this.isSingle) {
      SingleGameModule.SET_INACTIVE();
      SettingsModule.SET_GAME_MODE(GameMode.Seeded);
    }
  }

  showSettings() {
    SettingsModule.SHOW_SETTINGS();
  }

  showAbout() {
    SettingsModule.SHOW_ABOUT();
  }
}
</script>

<style lang="scss" scoped>
.meta {
  margin-left: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;

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

      &.selected {
        background: linear-gradient(to top left, #3a74d3, #4286f4);
      }
    }
  }
}
</style>