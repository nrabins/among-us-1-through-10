<template>
  <div class="scoreboard">
    <div class="seed-button" @click="setSeed" tabindex="0">
      {{ seed }} • {{ numberOfTrials }}
    </div>
    <div class="timer">
      <div v-if="timerRunning">
        {{ elapsedTimeMs | formatMs }} <span class="seconds">s</span>
      </div>
      <div v-else-if="lastTimeMs !== null">
        {{ lastTimeMs | formatMs }} <span class="seconds">s</span>
      </div>
      <div v-else>---</div>
    </div>
    <div class="times">
      <div class="best-times-title">Best Times</div>
      <div
        v-for="(time, i) in times"
        :key="i"
        :class="{ 'last-time': i == indexOfFirstMatch && time !== null }"
      >
        {{ time | formatMs }}
        <span v-if="time != null" class="seconds">s</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { SeededGameModule } from "@/store/modules/game/seeded";
import { SettingsModule } from "@/store/modules/settings";

@Component
export default class SeededGameScoreboard extends Vue {
  @Prop({ required: true })
  public now!: number;

  get timerData() {
    return SeededGameModule.timerDataOverall;
  }

  get elapsedTimeMs(): number | null {
    if (this.timerData.startTimeMs && this.now) {
      return this.now - this.timerData.startTimeMs;
    } else {
      return null;
    }
  }

  get lastTimeMs(): number | null {
    return this.timerData.lastTimeMs;
  }

  get times() {
    const timesForSeed = this.timerData.seededTimes.find(
      (st) => st.seed == this.seed && st.numberOfTrials == this.numberOfTrials
    );
    if (!timesForSeed) {
      return [null, null, null, null, null];
    }
    return timesForSeed.times;
  }

  get seed() {
    return SeededGameModule.seed;
  }

  get numberOfTrials() {
    return SeededGameModule.numberOfTrials;
  }

  get timerRunning(): boolean {
    return this.timerData.startTimeMs !== null;
  }

  get indexOfFirstMatch(): number | null {
    return this.times.indexOf(this.lastTimeMs);
  }

  setSeed() {
    SettingsModule.SHOW_SEED_DIALOG();
  }
}
</script>

<style lang="scss" scoped>
.scoreboard {
  min-width: 10vw;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;

  text-align: center;
  font-size: 1.2vw;

  .seed-button {
    padding: 1vw;
    border-bottom: 0.2vw solid black;

    border-radius: 0.8vw 0.8vw 0 0;
    background: linear-gradient(to top left, #3a74d3, #4286f4);
    color: white;
    text-transform: uppercase;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
      color: rgb(192, 192, 192);
    }
  }

  .timer {
    border-bottom: 0.2vw solid black;
    font-size: 2vw;
  }

  .times {
    .best-times-title {
      font-size: 1vw;
      text-transform: uppercase;
      margin-bottom: 1vw;
    }

    .last-time {
      color: gold;
    }

    margin: 1vw 0;
    font-size: 2vw;
    flex-grow: 1;
  }
}
</style>