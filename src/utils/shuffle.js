// @ts-check

/**
 * Creates a new array with its elements' order randomized,
 * using the Fisher-Yates (aka Knuth) Shuffle algorithm.
 *
 * @template T
 * @param {T[]} array The array to shuffle.
 * @throws {TypeError} If `array` is not array.
 * @returns {T[]} Returns a new array with its elements randomised.
 * @example
 *
 * shuffle(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
 * // => ['b', 'f', 'h', 'e', 'd', 'c', 'g', 'a']
 */
export const shuffle = array => {
  if (!Array.isArray(array)) {
    throw new TypeError('Expected an array for first argument');
  }

  const newArray = [...array];
  let currentIndex = newArray.length;

  // While remaining elements to shuffle...
  while (currentIndex) {
    const randomIndex = Math.random() * currentIndex-- | 0; // Pick a remaining element...
    const temporaryValue = newArray[currentIndex]; // And swap it with the current element.

    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }

  return newArray;
};
