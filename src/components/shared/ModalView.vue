<template>
  <div class="modal-container">
    <div class="modal-overlay" @click="$emit('close')" />
    <div class="modal-content">
      <div class="close-button noselect" @click="$emit('close')">✕</div>
      <h1 class="title">
        <slot name="title">Modal</slot>
      </h1>
      <div class="body">
        <slot>
          <p>
            Here is some text. It might be a little long. Let's see how it fits!
            Maybe it doesn't fit at all!
          </p>

          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. At, quae?
            Illo laborum consequuntur mollitia ipsam odio quis quod optio dicta
            ad! Dolorum temporibus quas delectus magni veniam facilis quibusdam
            exercitationem?
          </p>
        </slot>
      </div>
      <div class="actions" v-if="hasActions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ModalView extends Vue {
  get hasActions() {
    return !!this.$slots.actions;
  }
}
</script>

<style lang="scss" scoped>

.secondary {
  background-color: rgba(0, 0, 0, 0.363);
}

.modal-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  .modal-overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  .modal-content {
    background-color: #202225;
    border: rgba(255, 255, 255, 0.329) solid 0.1vw;
    border-radius: .5rem;
    box-shadow: 0 1vw 3vw rgba(0, 0, 0, 0.9);

    color: #eee;

    z-index: 1001;

    padding: .8rem 1.6rem;
    position: relative;

    .close-button {
      padding: .5rem;
      position: absolute;
      top: -0.1rem;
      right: 0.1rem;
      font-size: 1rem;
      font-weight: bolder;
      cursor: pointer;

      color: #ccc;

      &:hover {
        color: #fff;
      }
    }

    .title {
      padding: 0 0 1rem 0;
      border-bottom: 0.1vw solid rgb(155, 155, 155);
      font-size: 1.5rem;
    }

    .body {
      margin-top: 1rem;
    }

    .actions {
      border-top: 0.1vw solid rgb(155, 155, 155);
      padding-top: 1rem;
      margin-top: 1rem;
      display: flex;
      justify-content: flex-end;

      > *:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }
}
</style>