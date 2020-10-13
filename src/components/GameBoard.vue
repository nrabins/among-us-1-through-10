<template>
  <div class="gameboard">
    <div>
      <GameButton
        @click="handleClick(i.number)"
        v-for="i in firstRow"
        :number="i"
        :key="i.number"
      />
    </div>
    <div>
      <GameButton
        @click="handleClick(i.number)"
        v-for="i in secondRow"
        :number="i"
        :key="i.number"
      />
    </div>
  </div>
</template>

<script>
import GameButton from "@/components/GameButton";

export default {
  components: {
    GameButton,
  },
  data() {
    return {
      numbers: [
        {
          number: 1,
          clicked: true,
        },
        {
          number: 2,
          clicked: true,
        },
        {
          number: 3,
          clicked: true,
        },
        {
          number: 4,
          clicked: true,
        },
        {
          number: 5,
          clicked: true,
        },
        {
          number: 6,
          clicked: true,
        },
        {
          number: 7,
          clicked: true,
        },
        {
          number: 8,
          clicked: true,
        },
        {
          number: 9,
          clicked: true,
        },
        {
          number: 10,
          clicked: false,
        },
      ],
    };
  },
  computed: {
    firstRow() {
      return this.numbers.slice(0, 5);
    },
    secondRow() {
      return this.numbers.slice(5);
    },
  },
  methods: {
    handleClick(number) {
      const numberData = this.numbers.find((x) => x.number == number);

      if (this.numbers.every(n => (n.number < number && n.clicked) || n.number >= number)) {
        numberData.clicked = true;
        if (this.numbers.every(n => n.clicked)) {
          console.log('we won!');
          
          document.addEventListener('mousedown', () => {
            this.numbers.forEach(n => n.clicked = false);
          }, { once: true})
        }
      } else {
        this.numbers.forEach(n => n.clicked = false);
      }
      
    },
  },
};
</script>

<style lang="scss" scoped>
.gameboard {
  // height: 26.9vh;
  // width: 39vw;

  background-color: lightblue;
  border: 1px solid black;
}
</style>