<template>
  <div>
    <div class="border-5">
      <div class="border-4">
        <div class="border-3">
          <div class="border-2">
            <div class="border-1">
              <div
                class="new-game-overlay noselect"
                v-show="showNewGameOverlay"
                @click="newGame"
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
    <SeededRunProgressBar />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GameButton from "@/components/game/shared/GameButton.vue";
import SeededRunProgressBar from '@/components/game/seeded/SeededRunProgressBar.vue'

import { SingleGameModule } from "@/store/modules/game/single";
import { Phase } from "@/store/modules/game/shared/types";

import { SettingsModule } from "@/store/modules/settings";

@Component({
  components: {
    GameButton,
    SeededRunProgressBar,
  },
})
export default class SeededGameBoard extends Vue {
  blinkInterval: number | null = null;
  isBlinking = false;

  get isAnimating() {
    return this.blinkInterval !== null;
  }

  get firstRow() {
    return SingleGameModule.numbers.slice(0, 5);
  }

  get secondRow() {
    return SingleGameModule.numbers.slice(5);
  }

  get showNewGameOverlay() {
    return SingleGameModule.phase == Phase.Inactive;
  }

  newGame(): void {
    SingleGameModule.NEW_GAME();
  }

  handleClick(number: number): void {
    console.log("clicked in seeded");
    if (this.isAnimating || SingleGameModule.phase == Phase.Inactive) {
      return;
    }

    if (number != SingleGameModule.nextNumber) {
      if (SettingsModule.gameSettings.newGameOnMistake) {
        this.animateError(SingleGameModule.SET_INACTIVE);
      } else {
        SingleGameModule.RESET_PROGRESS();
        this.animateError();
      }
    } else {
      SingleGameModule.CLICK_NUMBER(number);
    }
  }

  animateError(callback?: Function): void {
    if (this.blinkInterval) {
      return;
    }

    const blinkTimeMs = 250;
    let blinksLeft = 2;
    this.isBlinking = true;

    this.blinkInterval = setInterval(() => {
      this.isBlinking = !this.isBlinking;
      if (!this.isBlinking) {
        blinksLeft--;
      }

      if (blinksLeft == 0 && this.blinkInterval != null) {
        clearInterval(this.blinkInterval);
        this.blinkInterval = null;
        if (callback) {
          callback.apply(this);
        }
      }
    }, blinkTimeMs);
  }
}
</script>

<style lang="scss" scoped>
.gameboard {
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