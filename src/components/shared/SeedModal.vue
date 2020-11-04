<template>
  <ModalView v-on="$listeners">
    <template #title>Select Seed</template>
    <div class="seed-settings">
      <div class="form-input">
        <label for="seed">Seed:</label>
        <input
          id="seed"
          type="text"
          v-model="seed"
          maxlength="10"
        />
      </div>

      <div class="form-input">
        <label for="numberOfTrials">Number of trials (2-100):</label>
        <input
          type="number"
          min="2"
          max="100"
          v-model="numberOfTrials"
        />
      </div>
    </div>
    <template #actions>
      <button @click="cancel" class="secondary">Cancel</button>
      <button @click="confirm">Confirm</button>
    </template>
  </ModalView>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ModalView from '@/components/shared/ModalView.vue';
import { SettingsModule } from '@/store/modules/settings';
import { SeededGameModule } from '@/store/modules/game/seeded';

@Component({
  components: {
    ModalView,
  },
})
export default class SeedModal extends Vue {
  seed = '';
  numberOfTrials = 0;

  created() {
    this.seed = SeededGameModule.seed;
    this.numberOfTrials = SeededGameModule.numberOfTrials;
  }

  cancel() {
    SettingsModule.HIDE_SEED_DIALOG();
  }

  confirm() {
    SeededGameModule.setSeed({
      seed: this.seed,
      numberOfTrials: this.numberOfTrials,
    });
    SettingsModule.HIDE_SEED_DIALOG();
  }
}
</script>

<style lang="scss" scoped>
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

  &.secondary {
    background: none;

    &:hover {
      background: rgba(255, 255, 255, 0.137);
    }
  }
}

.seed-settings {
  display: flex;
  flex-direction: column;
  color: #eee;

  .form-input {
    display: flex;
    align-items: center;

    label {
      margin-right: 1rem;
    }

    input {
      padding: 0.3rem;
      background: none;

      color: white;
      border: white solid 0.1vw;

      &#seed {
        max-width: 15ch;
        text-transform: uppercase;
      }

      &[type='number'] {
        max-width: 6ch;
      }
    }
  }

  > *:not(:last-child) {
    margin-bottom: 1rem;
  }
}
</style>