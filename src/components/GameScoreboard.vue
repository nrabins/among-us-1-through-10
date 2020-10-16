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

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class GameScoreboard extends Vue {
  @Prop({ required: true }) 
  public title!: string;
  
  scores: Array<number | null> = [null, null, null, null, null];
  lastTimeMs: number | null = null;
  startTimeMs: number | null = null;
  now: number | null = null;

  get timerRunning() {
    return this.startTimeMs != null;
  }

  get elapsedTimeMs() {
    if (this.now && this.startTimeMs) {
      return this.now - this.startTimeMs;
    } else {
      return null;
    }
  }

  mounted() {
    this.updateNow();
    setInterval(this.updateNow.bind(this), 11);
  }
  updateNow() {
    this.now = Date.now();
  }

  clearTimer() {
    this.lastTimeMs = null;
  }

  startTimer() {
    this.lastTimeMs = null;
    this.startTimeMs = Date.now();
  }

  stopTimer() {
    if (this.elapsedTimeMs) {
      this.lastTimeMs = this.elapsedTimeMs;
      this.addScore(this.elapsedTimeMs);
    }
    this.startTimeMs = null;
  }

  addScore(score: number) {
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
  }
  /*
    
export default {
  props: ['title'],
};*/
}
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
      margin-bottom: 1vw;
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