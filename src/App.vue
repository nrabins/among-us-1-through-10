<template>
  <div id="app">
    <SettingsModal v-if="isShowingSettings" @close="hideSettings" />
    <AboutModal v-if="isShowingAbout" @close="hideAbout" />
    <SeedModal v-if="isShowingSeedDialog" @close="hideSeedDialog" />

    <AmongUsGame />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AmongUsGame from "@/components/game/shared/AmongUsGame.vue";
import SettingsModal from "@/components/shared/SettingsModal.vue";
import AboutModal from "@/components/shared/AboutModal.vue";
import SeedModal from "@/components/shared/SeedModal.vue";

import { SingleGameModule } from "@/store/modules/game/single";
import { SettingsModule } from "@/store/modules/settings";
import { SeededGameModule } from './store/modules/game/seeded';

@Component({
  components: {
    AmongUsGame,
    SettingsModal,
    AboutModal,
    SeedModal,
  },
})
export default class App extends Vue {
  created() {
    SettingsModule.LOAD_GAME_SETTINGS();

    SingleGameModule.LOAD_DATA();
    
    SeededGameModule.loadData();
    SeededGameModule.NEW_GAME();
  }

  get isShowingSettings() {
    return SettingsModule.isShowingSettings;
  }

  get isShowingAbout() {
    return SettingsModule.isShowingAbout;
  }

  get isShowingSeedDialog() {
    return SettingsModule.isShowingSeedDialog;
  }

  hideSettings() {
    SettingsModule.HIDE_SETTINGS();
  }

  hideAbout() {
    SettingsModule.HIDE_ABOUT();
  }

  hideSeedDialog() {
    SettingsModule.HIDE_SEED_DIALOG();
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

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>
