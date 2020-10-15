<template>
  <div class="game-button noselect" @mousedown="mouseDown" :class="{ clicked: number.clicked, blinking: isBlinking }">
    <span>
      {{ number.number }}
    </span></div>
</template>

<script>
export default {
  props: ["number", "isBlinking"],
  methods: {
    mouseDown() {
      document.addEventListener(
        "mouseup",
        () => {
          this.$emit("click");
        },
        {
          once: true,
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.game-button {
  display: inline-block;
  width: 7.7vw;
  height: 7.7vw;

  margin: .15vw;

  border-radius: .4vw;
  border: solid .25vw black;

  text-align: center;
  font-size: 5vw;
  font-weight: 100;

  background-color: #8fa1d1;

  position: relative;
  
  &.clicked {
    background-color: #00a141;
  }

  &.blinking {
    background-color: #901241
  }

  span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}


</style>