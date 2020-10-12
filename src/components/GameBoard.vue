<template>
  <div class="gameboard">
    <div>
      <GameButton v-for="i in firstRow" :number="i" :key="i" />
    </div>
    <div>
      <GameButton v-for="i in secondRow" :number="i" :key="i" />
    </div>

  </div>
</template>

<script>
import GameButton from "@/components/GameButton";

export default {
  components: {
    GameButton,
  },
  data() {
    return {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  computed: {
    firstRow() {
      return this.numbers.slice(0, 5);
    },
    secondRow() {
      return this.numbers.slice(5);
    }
  }
};
</script>

<style lang="scss" scoped>
.gameboard {
  // height: 26.9vh;
  // width: 39vw;

  background-color: lightblue;
  border: 1px solid black;
}
</style>