<template>
  <div class="scoreboard">
    {{ title }}
    <div class="timer">
      {{ timeElapsed }}
    </div>
    <div v-for="(score, i) in scores" :key="i">
      {{ score }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      scores: [],
    };
  },
  computed: {
    timeElapsed() {
      return Date.now()
    }
  },
  methods: {
    addScore(score) {
      console.log(`got a new score ${score}`);
      this.scores.push(score);
      this.scores.sort((a, b) => a - b);
      this.scores = this.scores.slice(0, 3);
    },
  },
};
</script>

<style lang="scss" scoped>
.scoreboard {
  display: flex;
  flex-direction: column;
}
</style>