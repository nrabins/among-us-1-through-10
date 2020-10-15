<template>
  <div class="scoreboard">
    <div class="title">
      {{ title }}
    </div>
    <div class="timer">
      <div v-if="timerRunning">
        {{ elapsedTimeMs | formatMs }} <span class="seconds">s</span>
      </div>
      <div v-else-if="lastTimeMs != null">
        {{ lastTimeMs | formatMs }} <span class="seconds">s</span>
      </div>
      <div v-else>---</div>
    </div>
    <div class="scores">
      <div class="best-times-title">Best Times</div>
      <div
        v-for="(score, i) in scores"
        :key="i"
        :class="{ 'last-score': score == lastTimeMs && score !== null }"
      >
        {{ score | formatMs }}
        <span v-if="score != null" class="seconds">s</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {
      scores: [null, null, null, null, null],
      lastTimeMs: null,
      startTimeMs: null,
      now: null,
    };
  },
  mounted() {
    this.updateNow();
    setInterval(this.updateNow.bind(this), 11);
  },
  computed: {
    timerRunning() {
      return this.startTimeMs != null;
    },
    elapsedTimeMs() {
      return this.now - this.startTimeMs;
    },
  },
  methods: {
    updateNow() {
      this.now = Date.now();
    },
    clearTimer() {
      this.lastTimeMs = null;
    },
    startTimer() {
      this.lastTimeMs = null;
      this.startTimeMs = Date.now();
    },
    stopTimer() {
      this.lastTimeMs = this.elapsedTimeMs;
      this.addScore(this.elapsedTimeMs);
      this.startTimeMs = null;
    },
    addScore(score) {
      console.log(`got a new score ${score}`);
      this.scores.push(score);
      this.scores.sort((a, b) => {
        if (a == null) {
          return 1;
        } else if (b == null) {
          return -1;
        } else {
          return a - b;
        }
      });
      this.scores = this.scores.slice(0, 5);
    },
  },
};
</script>

<style lang="scss" scoped>
.scoreboard {
  width: 10vw;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;

  text-align: center;
  font-size: 1vw;

  .title {
    padding: 1vw;
    border-bottom: 0.2vw solid black;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .timer {
    border-bottom: 0.2vw solid black;
    font-size: 2vw;
  }

  .scores {
    .best-times-title {
      font-size: 1vw;
      text-transform: uppercase;
    }

    .last-score {
      color: yellow;
    }

    margin: 1vw 0;
    font-size: 2vw;
    flex-grow: 1;
  }
}
</style>