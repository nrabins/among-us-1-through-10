<template>
  <div class="container">
    <GameBoard
      ref="gameBoard"
      @newGameRequest="newGame"
      @firstClick="onFirstClick"
      @gameEnd="onGameEnd"
    />
    <div class="meta">
      <!-- <button class="new-game" :class="{ 'has-won': hasWon }" @click="newGame">
        New Game
      </button> -->
      <div class="scoreboards">
        <GameScoreboard ref="sinceVisibleScoreboard" title="Total" />
        <GameScoreboard
          ref="sinceFirstClickScoreboard"
          title="First Click"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GameBoard from '@/components/GameBoard';
import GameScoreboard from '@/components/GameScoreboard';

export default {
  components: {
    GameBoard,
    GameScoreboard,
  },
  data() {
    return {
      hasWon: false,
    };
  },
  methods: {
    newGame() {
      this.hasWon = false;
      this.$refs.gameBoard.newGame();
      this.$refs.sinceVisibleScoreboard.startTimer();
      this.$refs.sinceFirstClickScoreboard.clearTimer();
    },
    onFirstClick() {
      // this.firstClickMs = Date.now();
      this.$refs.sinceFirstClickScoreboard.startTimer();
    },
    onGameEnd() {
      console.log('game has ended');
      this.hasWon = true;
      this.$refs.sinceVisibleScoreboard.stopTimer();
      this.$refs.sinceFirstClickScoreboard.stopTimer();
      // document.addEventListener("mousedown", this.newGame, { once: true });
    },
  },
};
</script>

<style lang="scss">
.container {
  display: flex;
  align-items: center;
}

.meta {
  margin: 1vh;
  display: flex;
  flex-direction: column;

  .scoreboards {
    border-radius: 20px;
    border: .2vw solid black;
    background-color: rgba(0, 0, 0, 0.308);
    color: rgba(255, 255, 255, 0.801);

    > *:first-child {
      border-right: .1vw solid black;
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