<template>
  <div>
    <GameBoard ref="gameBoard" />
    <div class="controls">
      <button @click="newGame">New Game</button>
    </div>
  </div>
</template>

<script>
import GameBoard from "@/components/GameBoard";

export default {
  components: {
    GameBoard,
  },
  methods: {
    newGame() {
      this.$refs.gameBoard.newGame();
    }
  }
};
</script>

<style lang="scss" scoped>
.controls {
  padding: 2vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>