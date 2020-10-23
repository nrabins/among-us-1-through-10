<template>
  <ModalView v-on="$listeners">
    <template #title> Settings </template>
    <button class="reset" @click="resetData">Reset Data</button>
  </ModalView>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ModalView from '@/components/ModalView.vue';
import { GameModule } from '@/store/modules/game';

@Component({
  components: {
    ModalView,
  },
})
export default class extends Vue {
  resetData(): void {
    if (window.confirm('Reset all data?\nThis cannot be undone.')) {
      GameModule.RESET_DATA();
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  background-color: rgba(60, 69, 202, 0.74);
  color: #eee;
  padding: .8rem 1.6rem;
  border: 1px solid #eee;
  border-radius: 2px;

  text-transform: uppercase;

  cursor: pointer;

  &:hover {
    background-color: rgba(85, 95, 231, 0.74)
  }
}
</style>