<template>
  <div id="app">
    <SettingsModal v-if="isShowingSettings" @close="hideSettings" />
    <AboutModal v-if="isShowingAbout" @close="hideAbout" />
    <AmongUsGame />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AmongUsGame from "@/components/game/single/AmongUsGame.vue";
import SettingsModal from "@/components/shared/SettingsModal.vue";
import AboutModal from "@/components/shared/AboutModal.vue";
import { GameModule } from "@/store/modules/game/single";
import { SettingsModule } from "@/store/modules/settings";

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
