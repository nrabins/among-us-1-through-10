<template>
  <div class="container">
    <GameBoard />
    <SideMeta />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import GameBoard from '@/components/game/shared/GameBoard.vue';
import SideMeta from '@/components/game/shared/SideMeta.vue'

@Component({
  components: {
    GameBoard,
    SideMeta
  },
})
export default class AmongUsGame extends Vue {

}
</script>

<style lang="scss" scoped>

.container {
  display: flex;
  align-items: center;
}

</style>