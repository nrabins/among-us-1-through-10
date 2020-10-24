<template>
  <ModalView v-on="$listeners">
    <template #title>
      <div class="title">
        <span> About </span>
        <span class="version"> v{{ version }} </span>
      </div>
    </template>

    <p>
      <em>1-10 Simulator</em> is made with ♥ by
      <a href="https://www.github.com/nrabins" target="_blank">Nate Rabins</a>
    </p>

    <p>
      <a href="https://github.com/nrabins/among-us-1-through-10" target="_blank">View Source</a>
      ///
      <a href="https://forms.gle/uuZoExLhQ7skuciu7" target="_blank">Submit Feedback</a>
    </p>

    <h2>Acknowledgements</h2>
    <ul>
      <li>
        Thanks to <a href="https://twitter.com/JoINrbs?s=20" target="_blank">Jorbs</a> for the
        inspiration
      </li>
      <li>Thanks to the many Jorblings for testing and ideas</li>
    </ul>
  </ModalView>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ModalView from '@/components/ModalView.vue';
import { SettingsModule } from '@/store/modules/settings';

@Component({
  components: {
    ModalView,
  },
})
export default class AboutModal extends Vue {
  get version() {
    return SettingsModule.version;
  }
}
</script>

<style lang="scss" scoped>

.title {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .version {
    font-size: 1rem;
  }
}

a {
  text-decoration: none;
  color: rgb(20, 154, 216);

  &:hover {
    color: rgb(92, 185, 228);
  }
}

h2 {
  margin-top: 1.5rem;
  font-size: 1rem;
}

em {
  font-style: normal;
  font-weight: bold;
}
</style>