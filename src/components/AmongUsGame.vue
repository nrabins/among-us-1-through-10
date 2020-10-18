<template>
  <div class="container">
    <div class="game-board-and-source">
      <GameBoard />
      <a href="https://github.com/nrabins/among-us-1-through-10">View Source</a>
    </div>

    <div class="meta">
      <div class="scoreboards">
        <GameScoreboard title="Overall" :timerType="1" :now="now" />
        <GameScoreboard title="1-10" :timerType="2" :now="now" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import GameBoard from "@/components/GameBoard.vue";
import GameScoreboard from "@/components/GameScoreboard.vue";

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
}
</script>

<style lang="scss">
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
  margin: 1vh;
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

    margin: 1vw;

    > * {
      display: inline-block;
    }
  }
}

$button-text-color: #98ff9e;
$button-color: #00a141;
$button-color-hover: lighten($button-color, 7%);
$button-color-emphasis: #00a141;
$button-color-emphasis-hover: blue;

button.new-game {
  padding: 0.8vw 1.2vw;
  border-radius: 0.5vw;
  border: 0.2vw solid black;
  text-transform: uppercase;
  font-size: 1.5vw;
  cursor: pointer;

  color: $button-text-color;
  background-color: $button-color;

  &:hover {
    background-color: $button-color-hover;
  }

  &.has-won {
    background-color: $button-color-emphasis;

    &:hover {
      background-color: $button-color-emphasis-hover;
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