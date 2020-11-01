<template>
  <div class="progress-bar">
    <div
      class="segment"
      v-for="i in total"
      :key="i"
      :class="{
        completed: i < activeIndex,
        active: i == activeIndex,
        uncompleted: i > activeIndex,
      }"
    >{{ i }}</div>
  </div>
</template>

<script lang="ts">
// import { GameModule } from '@/store/modules/game';
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SeededRunProgressBar extends Vue {
  get activeIndex() {
    return 3; //return GameModule.seededRunActiveIndex;
  }

  get total() {
    return 10; //return GameModule.seededRunTrials.length;
  }
}
</script>

<style lang="scss" scoped>

$border-radius: 1vw;

.progress-bar {
  height: 2vw;
  width: 40vw;

  border: 0.1vw solid black;
  border-top: none;
  border-bottom-left-radius: $border-radius;
  border-bottom-right-radius: $border-radius;

  display: flex;
  flex-wrap: nowrap;
}

.segment {
  &:not(.active) {
    background-color: red;
  }

  flex-grow: 1;

  &:not(:last-child) {
    border-right: 0.1vw solid rgba(0, 0, 0, 0.404);
  }

  &:first-child {
    border-bottom-left-radius: $border-radius;
  }

  &:last-child {
    border-bottom-right-radius: $border-radius;
  }

  &.completed {
    background: linear-gradient(to top left, #3a74d3, #4286f4);
  }

  $glow-time: 0.7s;

  &.active {
    background: linear-gradient(to top right, #3a74d3, rgb(176, 191, 216));
    background-size: 400% 400%;

    -webkit-animation: AnimationName $glow-time ease infinite;
    -moz-animation: AnimationName $glow-time ease infinite;
    animation: AnimationName $glow-time ease infinite;
  }

  @-webkit-keyframes AnimationName {
    0% {
      background-position: 43% 0%;
    }
    50% {
      background-position: 58% 100%;
    }
    100% {
      background-position: 43% 0%;
    }
  }
  @-moz-keyframes AnimationName {
    0% {
      background-position: 43% 0%;
    }
    50% {
      background-position: 58% 100%;
    }
    100% {
      background-position: 43% 0%;
    }
  }
  @keyframes AnimationName {
    0% {
      background-position: 43% 0%;
    }
    50% {
      background-position: 58% 100%;
    }
    100% {
      background-position: 43% 0%;
    }
  }

  &.uncompleted {
    background: linear-gradient(to top left, #14294b, #214785);
  }
}
</style>