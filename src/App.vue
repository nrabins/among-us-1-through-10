<template>
  <div id="app">
    <AmongUsGame />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AmongUsGame from "@/components/AmongUsGame.vue";
import { GameModule } from '@/store/modules/game';

@Component({
  components: {
    AmongUsGame,
  },
})
export default class extends Vue {
  created() {
    GameModule.LOAD_DATA();
  }
}
</script>

<style lang="scss">
html,
body {
  height: 100vh;
  margin: 0;

  background: linear-gradient(to top left, #373b44, #4286f4);
}

#app {
  height: 100%;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
