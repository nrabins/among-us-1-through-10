<template>
  <ModalView v-on="$listeners">
    <template #title> About Seeded Runs </template>
    <div class="about-modal">
      <p>
        Seeded runs are a way to test 1-10 skill in a more consistent fashion,
        decreasing the impact of a 'fast' gameboard.
      </p>
      <p>
        To accomplish this, a set of problems (individual 1-10 boards) are
        presented to the user. These problems are generated based on a seed, set
        by clicking the button at the top of the scoreboard.
      </p>
      <p>
        The individual problems are rotated/flipped (preserving their
        difficulty) and presented in a random order.
      </p>
      <p>
        Runs can be between 2-100 problems long.
      </p>
    </div>
    <template #actions>
      <button @click="$emit('close')">Close</button>
    </template>
  </ModalView>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ModalView from '@/components/shared/ModalView.vue';

@Component({
  components: {
    ModalView,
  },
})
export default class SeededInfoModal extends Vue {}
</script>

<style lang="scss" scoped>
.about-modal {
  max-width: 60ch !important;
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