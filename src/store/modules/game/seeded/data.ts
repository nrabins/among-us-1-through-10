import seedrandom from 'seedrandom';

export const dummyData = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [10, 9, 8, 7, 6, 5, 4, 3, 2, 1,]
];

const generateTrial = function (rng: seedrandom.prng): number[] {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(rng.double() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
}

// eslint-disable-next-line
function shuffle(array: any[]) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


/**
 * Topologically-identical Orientations:
 * 
 * 0 1 2 3 4
 * 5 6 7 8 9
 * 
 * 4 3 2 1 0
 * 9 8 7 6 5
 * 
 * 9 8 7 6 5
 * 4 3 2 1 0
 * 
 * 5 6 7 8 9
 * 0 1 2 3 4
 */
const orientations = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [4, 3, 2, 1, 0, 9, 8, 7, 6, 5],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  [5, 6, 7, 8, 9, 0, 1, 2, 3, 4]
]

/**
 * The goal of this shuffle is to maintain the complexity of each individual trial, but rotate/flip it such that it isn't memorizable.
 * To do so, we shuffle according to the matrices above, as these maintain the internal relationships between numbers.
 * We also randomize the order of the trials.
 */
export const reorientAndShuffle = (trials: number[][]) => {
  // Rotate/flip (4 possibilities)
  const newTrials = trials.map(trial => {
    const rotation = orientations[Math.floor(Math.random() * orientations.length)];

    const rotatedTrial: number[] = [];
    for (let i = 0; i < trial.length; i++) {
      const oldIndex = rotation[i];
      const num = trial[oldIndex];
      rotatedTrial.push(num);
    }
    return rotatedTrial;
  })

  shuffle(newTrials);
  return newTrials;
}

export const getSeededTrials = function (count: number, seed: string): number[][] {
  if (count > 100 || count <= 0) {
    return [];
  }
  const rng = seedrandom(seed);

  let trials = [];
  while (count-- > 0) {
    const trial = generateTrial(rng);
    trials.push(trial)
  }

  trials = reorientAndShuffle(trials);

  return trials;
}
