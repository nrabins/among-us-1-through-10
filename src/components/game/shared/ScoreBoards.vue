<template>
  <div class="scoreboards">
    <template v-if="isSingle">
      <SingleGameScoreboard :timerType="1" :now="now" />
      <SingleGameScoreboard :timerType="2" :now="now" />
    </template>
    <template v-else-if="isSeeded">
      <SeededGameScoreboard :now="now" />
    </template>
    <template v-else> Missing scoreboard for current game mode </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import SingleGameScoreboard from '@/components/game/single/SingleGameScoreboard.vue';
import SeededGameScoreboard from '@/components/game/seeded/SeededGameScoreboard.vue';
import { GameMode } from '@/store/modules/settings/types';
import { SettingsModule } from '@/store/modules/settings';

@Component({
  components: {
    SingleGameScoreboard,
    SeededGameScoreboard,
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

  display: flex;

  > *:not(:first-child) {
    border-left: 0.1vw solid black;
  }

  margin: 1vw 0;

  > * {
    display: inline-block;
  }
}
</style>