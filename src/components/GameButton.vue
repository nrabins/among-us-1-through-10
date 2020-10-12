<template>
  <button>{{ number }}</button>
</template>

<script>
export default {
  props: ['number']
}
</script>

<style lang="scss" scoped>
button {
  width: 7.7vw;
  height: 7.7vw;

  text-align: center;
  font-size: 5vw;
  font-weight: 100;
}
</style>