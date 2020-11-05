<template>
  <ModalView v-on="$listeners">
    <template #title> Settings </template>
    <div class="checkbox">
      <input
        type="checkbox"
        id="newGameOnMistakeSingle"
        v-model="gameSettings.newGameOnMistakeSingle"
        @change="onSettingChanged"
      />
      <label for="newGameOnMistakeSingle">New Game on Mistake (Single)</label>
    </div>
    <div class="checkbox">
      <input
        type="checkbox"
        id="newGameOnMistakeSeeded"
        v-model="gameSettings.newGameOnMistakeSeeded"
        @change="onSettingChanged"
      />
      <label for="newGameOnMistakeSeeded"
        >New Game on Mistake (Seeded Run)</label
      >
    </div>
    <template #actions>
      <button class="reset" @click="resetData">Reset Data</button>
      <button @click="close">Close</button>
    </template>
  </ModalView>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ModalView from '@/components/shared/ModalView.vue';
import { SingleGameModule } from '@/store/modules/game/single';
import { SettingsModule } from '@/store/modules/settings';
import { GameMode, GameSettings } from '@/store/modules/settings/types';
import { SeededGameModule } from '@/store/modules/game/seeded';

@Component({
  components: {
    ModalView,
  },
})
export default class SettingsModal extends Vue {
  gameSettings: GameSettings = {
    newGameOnMistakeSingle: false,
    newGameOnMistakeSeeded: false,
    gameMode: GameMode.Single,
  };

  created() {
    this.gameSettings = { ...SettingsModule.gameSettings };
  }

  onSettingChanged() {
    SettingsModule.UPDATE_GAME_SETTINGS(this.gameSettings);
  }

  resetData(): void {
    if (window.confirm('Reset all data?\nThis cannot be undone.')) {
      SingleGameModule.RESET_DATA();
      SeededGameModule.RESET_DATA();
    }
  }

  close() {
    SettingsModule.HIDE_SETTINGS();
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  margin: 1rem 0;

  cursor: pointer !important;
  input {
    padding: 0.5rem;
  }

  label {
    margin-left: 0.7rem;
    cursor: pointer;
  }
}

button {
  background: linear-gradient(to top left, #3a74d3, #4286f4);
  color: #eee;
  padding: 0.8rem 1.6rem;
  border: 1px solid #eee;
  border-radius: 2px;

  text-transform: uppercase;

  cursor: pointer;

  &:hover {
    background: linear-gradient(to top left, #285cb1, #2b68ca);
  }
}
</style>