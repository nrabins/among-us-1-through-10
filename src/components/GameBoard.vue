<template>
  <div class="border-5">
    <div class="border-4">
      <div class="border-3">
        <div class="border-2">
          <div class="border-1">
            <div
              class="new-game-overlay noselect"
              v-show="hasWon"
              @click="requestNewGame"
            >
              CLICK TO START
            </div>
            <div class="reflections" />
            <div class="gameboard">
              <div class="offset-bottom-margin">
                <GameButton
                  @click="handleClick(i.number)"
                  v-for="i in firstRow"
                  :number="i"
                  :isBlinking="isBlinking"
                  :key="i.number"
                />
              </div>
              <div>
                <GameButton
                  @click="handleClick(i.number)"
                  v-for="i in secondRow"
                  :number="i"
                  :isBlinking="isBlinking"
                  :key="i.number"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameButton from '@/components/GameButton';

export default {
  components: {
    GameButton,
  },
  data() {
    return {
      blinkInterval: null,
      isBlinking: false,
      hasWon: true,
      numbers: [
        {
          number: 1,
          clicked: false,
        },
        {
          number: 2,
          clicked: false,
        },
        {
          number: 3,
          clicked: false,
        },
        {
          number: 4,
          clicked: false,
        },
        {
          number: 5,
          clicked: false,
        },
        {
          number: 6,
          clicked: false,
        },
        {
          number: 7,
          clicked: false,
        },
        {
          number: 8,
          clicked: false,
        },
        {
          number: 9,
          clicked: false,
        },
        {
          number: 10,
          clicked: false,
        },
      ],
    };
  },
  computed: {
    isAnimating() {
      return this.blinkInterval !== null;
    },
    firstRow() {
      return this.numbers.slice(0, 5);
    },
    secondRow() {
      return this.numbers.slice(5);
    },
  },
  methods: {
    requestNewGame() {
      this.$emit('newGameRequest');
    },
    newGame() {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      for (let i = numbers.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      }

      this.numbers = numbers.map((i) => ({
        number: i,
        clicked: false,
      }));

      this.hasWon = false;
    },
    handleClick(number) {
      if (this.isAnimating || this.hasWon) {
        return;
      }

      const numberData = this.numbers.find((x) => x.number == number);

      const highestNumberSoFar = Math.max(
        0,
        ...this.numbers.filter((n) => n.clicked).map((n) => n.number)
      );

      if (number == highestNumberSoFar + 1) {
        if (number == 1) {
          this.$emit('firstClick');
        }
        numberData.clicked = true;

        // Win condition
        if (this.numbers.every((n) => n.clicked)) {
          // if (this.numbers.filter((n) => n.clicked).length == 2) {
          this.hasWon = true;
          this.$emit('gameEnd');
        }
      } else {
        this.clearProgress();
      }
    },
    clearProgress() {
      this.numbers.forEach((number) => (number.clicked = false));
      this.animateError();
    },
    animateError() {
      if (this.blinkInterval) {
        return;
      }
      this.animating = true;

      const blinkTimeMs = 250;
      let blinksLeft = 2;
      this.isBlinking = true;

      this.blinkInterval = setInterval(() => {
        this.isBlinking = !this.isBlinking;
        if (!this.isBlinking) {
          blinksLeft--;
        }

        if (blinksLeft == 0) {
          clearInterval(this.blinkInterval);
          this.blinkInterval = null;
        }
      }, blinkTimeMs);
    },
  },
};
</script>

<style lang="scss" scoped>
.gameboard {
  // height: 26.9vh;
  // width: 39vw;

  background-color: #033cd1;
  border: 0.1vw solid #7f8eb7;
}

.offset-bottom-margin {
  margin-bottom: -0.2vh;
}

.new-game-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 3;

  font-size: 3vw;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
}

/* Border styling */
.border- {
  &1 {
    background-color: #4a453f;
    padding: 0.25vw;
    border-radius: 0.2vw;

    position: relative;
  }

  &2 {
    background: linear-gradient(to bottom right, #adabae, #868686);
    padding: 2vw;
    border-radius: 0.4vw;
  }

  &3 {
    background-color: #636562;
    padding: 0.25vw;
  }

  &4 {
    background-color: #424441;
    padding: 0.5vw;
  }

  &5 {
    background-color: #010002;
    padding: 0.4vw;

    position: relative;
  }
}

/* Reflections across gameboard */
$white: rgba(233, 247, 255, 0.274);

$band-1-start: 12%;
$band-1-end: 22%;
$band-2-start: 25%;
$band-2-end: 30%;
$band-3-start: 51%;
$band-3-end: 66%;
$band-4-start: 71%;
$band-4-end: 80%;

.reflections {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background: linear-gradient(
    126deg,
    transparent 0 $band-1-start,
    $white $band-1-start $band-1-end,
    transparent $band-1-end $band-2-start,
    $white $band-2-start $band-2-end,
    transparent $band-2-end $band-3-start,
    $white $band-3-start $band-3-end,
    transparent $band-3-end $band-4-start,
    $white $band-4-start $band-4-end,
    transparent $band-4-end 100%
  );

  z-index: 2;

  pointer-events: none;
}
</style>