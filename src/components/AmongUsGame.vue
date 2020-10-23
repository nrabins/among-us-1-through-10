<template>
  <div class="container">
    <div class="game-board-and-source">
      <GameBoard />
      <!-- <a href="https://github.com/nrabins/among-us-1-through-10">View Source</a> -->
    </div>

    <div class="meta">
      <div class="scoreboards">
        <GameScoreboard title="Overall" :timerType="1" :now="now" />
        <GameScoreboard title="1-10" :timerType="2" :now="now" />
      </div>
      <div class="settings-container">
        <button class="settings-button" @click="showSettings">⚙ Settings</button>
        <button class="about-button" @click="showAbout">About</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import GameBoard from "@/components/GameBoard.vue";
import GameScoreboard from "@/components/GameScoreboard.vue";
import { SettingsModule } from '@/store/modules/settings';

@Component({
  components: {
    GameBoard,
    GameScoreboard,
  },
})
export default class AmongUsGame extends Vue {
  now = Date.now();

  private readonly nowIntervalMs = 11;
  private nowIntervalHandle!: number;

  mounted() {
    this.nowIntervalHandle = setInterval(() => {
      this.now = Date.now();
    }, this.nowIntervalMs);
  }

  showSettings() {
    SettingsModule.SHOW_SETTINGS();
  }

  showAbout() {
    SettingsModule.SHOW_ABOUT();
  }

}
</script>

<style lang="scss">
$button-text-color: #98ff9e;
$button-color: #00a141;
$button-color-hover: lighten($button-color, 7%);

.container {
  display: flex;
  align-items: center;
}

.game-board-and-source {
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    font-size: 0.8vw;
    color: white;

    margin-top: 1.5vw;
  }
}

.meta {
  margin-left: 2vw;
  display: flex;
  flex-direction: column;

  .scoreboards {
    border-radius: 1vw;
    border: 0.2vw solid black;
    background-color: rgba(0, 0, 0, 0.308);
    color: rgba(255, 255, 255, 0.801);

    > *:first-child {
      border-right: 0.1vw solid black;
    }

    margin-bottom: 1vw;

    > * {
      display: inline-block;
    }
  }

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
      border: .2vw solid black;
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

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>