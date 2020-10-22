<template>
  <ModalView v-on="$listeners">
    <template #title> About </template>

    <p>Version {{ version }}</p>
    <p>
      <em>1-10 Simulator</em> is made with ♥ by
      <a href="https://www.github.com/nrabins">Nate Rabins</a>
    </p>

    <h2>Acknowledgements</h2>
    <ul>
      <li>
        Thanks to <a href="https://twitter.com/JoINrbs?s=20">Jorbs</a> for the
        inspiration
      </li>
      <li>Thanks to the many Jorblings for testing and ideas</li>
    </ul>

    <p></p>
    <p></p
  ></ModalView>
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
export default class extends Vue {
  get version() {
    return SettingsModule.version;
  }
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

a {
  text-decoration: none;
  color: rgb(20, 154, 216);

  &:hover {
    color: rgb(92, 185, 228);
  }
}

h2 {
  margin-top: 3rem;
  font-size: 1rem;
}
</style>