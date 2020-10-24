<template>
  <div id="app">
    <SettingsModal v-if="isShowingSettings" @close="hideSettings" />
    <AboutModal v-if="isShowingAbout" @close="hideAbout" />
    <AmongUsGame />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AmongUsGame from '@/components/AmongUsGame.vue';
import SettingsModal from '@/components/SettingsModal.vue';
import AboutModal from '@/components/AboutModal.vue';
import { GameModule } from '@/store/modules/game';
import { SettingsModule } from '@/store/modules/settings';

@Component({
  components: {
    AmongUsGame,
    SettingsModal,
    AboutModal,
  },
})
export default class App extends Vue {
  created() {
    GameModule.LOAD_DATA();
    SettingsModule.LOAD_GAME_SETTINGS();
  }

  get isShowingSettings() {
    return SettingsModule.isShowingSettings;
  }

  get isShowingAbout() {
    return SettingsModule.isShowingAbout;
  }

  hideSettings() {
    SettingsModule.HIDE_SETTINGS();
  }

  hideAbout() {
    SettingsModule.HIDE_ABOUT();
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
