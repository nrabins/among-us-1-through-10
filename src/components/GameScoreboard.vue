<template>
  <div class="scoreboard">
    <div class="title">
      {{ title }}
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

import { TimerType } from "@/store/modules/game/types";
import { GameModule } from "@/store/modules/game";

@Component
export default class GameScoreboard extends Vue {
  @Prop({ required: true })
  public timerType!: TimerType;

  @Prop({ required: true })
  public now!: number;

  get timerData() {
    return GameModule.timerDataForTimerType(this.timerType);
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
    return this.timerData.times;
  }

  get title() {
    switch (this.timerType) {
      case TimerType.Overall:
        return "Overall";
      case TimerType.OneThroughTen:
        return "1-10";
      default:
        throw `Unrecognized TimerType in GameScoreboard.title(): ${this.timerType}`;
    }
  }

  get timerRunning(): boolean {
    return this.timerData.startTimeMs !== null;
  }

  get indexOfFirstMatch(): number | null {
    return this.times.indexOf(this.lastTimeMs);
  }
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

  .times {
    .best-times-title {
      font-size: 1vw;
      text-transform: uppercase;
      margin-bottom: 1vw;
    }

    .last-time {
      color: yellow;
    }

    margin: 1vw 0;
    font-size: 2vw;
    flex-grow: 1;
  }
}
</style>