<template>
  <div class="scoreboard">
    {{ title }}
    <div class="scores">
      <div v-for="(score, i) in scores" :key="i">
        {{ score | formatMs }} <span class="seconds">s</span>
      </div>
    </div>
    <div class="timer">
      <div v-if="timerRunning">
        {{ timeElapsed | formatMs }} <span class="seconds">s</span>
      </div>
      <div v-else>
        ---
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      scores: [],
      startTimeMs: null
    };
  },
  computed: {
    timerRunning() {
      return this.startTimeMs != null;
    },
    timeElapsed() {
      return Date.now() - this.startTimeMs;
    }
  },
  methods: {
    startTimer() {
      this.startTimeMs = Date.now();
    },
    stopTimer() {
      this.startTimeMs = null;
    },
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
  height: 100%;
  display: flex;
  flex-direction: column;

  .scores {
    flex-grow: 1;
  }
}
</style>