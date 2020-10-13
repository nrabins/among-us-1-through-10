<template>
  <button @mousedown="mouseDown" :class="{ clicked: number.clicked }">{{ number.number }}</button>
</template>

<script>
export default {
  props: ["number"],
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
button {
  width: 7.7vw;
  height: 7.7vw;

  text-align: center;
  font-size: 5vw;
  font-weight: 100;

  background-color: lightblue;
  
  &.clicked {
    background-color: green;
  }
}
</style>