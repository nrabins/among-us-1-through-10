<template>
  <ModalView v-on="$listeners">
    <template #title> Settings </template>
    <div class="checkbox">
      <input
        type="checkbox"
        id="newGameOnSave"
        v-model="gameSettings.newGameOnMistake"
        @change="onSettingChanged"
      />
      <label for="newGameOnSave">New Game on Mistake</label>
    </div>
    <button class="reset" @click="resetData">Reset Data</button>
  </ModalView>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ModalView from '@/components/shared/ModalView.vue';
import { SingleGameModule } from '@/store/modules/game/single';
import { SettingsModule } from '@/store/modules/settings';
import { GameMode, GameSettings } from '@/store/modules/settings/types';

@Component({
  components: {
    ModalView,
  },
})
export default class SettingsModal extends Vue {
  gameSettings: GameSettings = {
    newGameOnMistake: false,
    gameMode: GameMode.Single
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
    }
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
  background-color: rgba(60, 69, 202, 0.74);
  color: #eee;
  padding: 0.8rem 1.6rem;
  border: 1px solid #eee;
  border-radius: 2px;

  text-transform: uppercase;

  cursor: pointer;

  &:hover {
    background-color: rgba(85, 95, 231, 0.74);
  }
}
</style>