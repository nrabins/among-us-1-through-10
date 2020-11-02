<template>
  <div class="scoreboards">
    <template v-if="isSingle">
      <SingleGameScoreboard title="Overall" :timerType="1" :now="now" />
      <SingleGameScoreboard title="1-10" :timerType="2" :now="now" />
    </template>
    <template v-else-if="isSeeded">
      Seeded scoreboard!
    </template>
    <template v-else>
      Missing scoreboard for current game mode
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import SingleGameScoreboard from "@/components/game/single/SingleGameScoreboard.vue";
import { GameMode } from '@/store/modules/settings/types';
import { SettingsModule } from '@/store/modules/settings';

@Component({
  components: {
    SingleGameScoreboard,
  },
})
export default class extends Vue {
  now = Date.now();

  private readonly nowIntervalMs = 11;
  private nowIntervalHandle!: number;

  mounted() {
    this.nowIntervalHandle = setInterval(() => {
      this.now = Date.now();
    }, this.nowIntervalMs);
  }

  get gameMode() {
    return SettingsModule.gameSettings.gameMode;
  }

  get isSingle() {
    return this.gameMode == GameMode.Single;
  }

  get isSeeded() {
    return this.gameMode == GameMode.Seeded;
  }
}
</script>

<style lang="scss" scoped>
.scoreboards {
  border-radius: 1vw;
  border: 0.2vw solid black;
  background-color: rgba(0, 0, 0, 0.308);
  color: rgba(255, 255, 255, 0.801);

  > *:first-child {
    border-right: 0.1vw solid black;
  }

  margin-bottom: 1vw;

  > * {
    display: inline-block;
  }
}
</style>