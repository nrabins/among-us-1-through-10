<template>
  <div class="container">
    <GameBoard
      ref="gameBoard"
      @gameStart="onGameStart"
      @firstClick="onFirstClick"
      @gameEnd="onGameEnd"
    />
    <div class="meta">
      <button class="new-game" :class="{ 'has-won': hasWon }" @click="newGame">
        New Game
      </button>
      <div class="scoreboards">
        <GameScoreboard ref="sinceVisibleScoreboard" title="Since Visible" />
      </div>
    </div>
  </div>
</template>

<script>
import GameBoard from "@/components/GameBoard";
import GameScoreboard from "@/components/GameScoreboard";

export default {
  components: {
    GameBoard,
    GameScoreboard,
  },
  data() {
    return {
      hasWon: false,
      gameStartMs: null,
      firstClickMs: null,
    };
  },
  methods: {
    newGame() {
      this.$refs.gameBoard.newGame();
    },
    onGameStart() {
      this.gameStartMs = Date.now();
    },
    onFirstClick() {
      this.firstClickMs = Date.now();
    },
    onGameEnd() {
      const now = Date.now();
      const fromGameStartMs = now - this.gameStartMs;
      // const fromFirstClickMs = now - this.firstClickMs;

      this.$refs.sinceVisibleScoreboard.addScore(fromGameStartMs);
      // document.addEventListener("mousedown", this.newGame, { once: true });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
}

.meta {
  margin: 1vh;
  display: flex;
  flex-direction: column;

  .scoreboards {
    flex-grow: 1;
  }
}

.new-game {
  padding: 1vw 2vw;
  border-radius: 0.5vw;
  border: 0.2vw solid black;
  text-transform: uppercase;
  font-size: 1vw;
  color: #98ff9e;

  background-color: darken(#00a141, 10%);

  &.has-won {
    background-color: #00a141;
  }
}
</style>