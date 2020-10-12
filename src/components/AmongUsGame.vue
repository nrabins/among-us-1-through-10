<template>
  <div> 
    <GameBoard /> 
    <GameControls />
  </div>
</template>

<script>
import GameBoard from '@/components/GameBoard';
import GameControls from '@/components/GameControls';

export default {
  components: {
    GameBoard,
    GameControls,
  }
}
</script>

<style>

</style>