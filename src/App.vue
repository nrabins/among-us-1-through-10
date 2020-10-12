<template>
  <div id="app">
    <AmongUsGame />
  </div>
</template>

<script>
import AmongUsGame from '@/components/AmongUsGame';

export default {
  name: 'App',
  components: {
    AmongUsGame
  }
}
</script>

<style lang="scss">

html, body {
  height: 100vh;
  margin: 0;
}

#app {
  height: 100%;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;



  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
