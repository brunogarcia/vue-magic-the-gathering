
/**
 * Get random index
 *
 * @param {number} max - Max index expected
 * @returns {number} - The random index
 */
function getRandomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Get only the not playing voices
 *
 * @param {Array<object>} voices - The voices list
 * @returns {Array<object>} The voices list filtered
 */
function getOnlyNotPlayingVoices(voices) {
  return voices.filter((voice) => !voice.playing);
}

/**
 * Get random voice
 *
 * @param {Array<object>} voices - The voices list
 * @returns {object} The random voice
 */
export default function getRandomVoice(voices) {
  const list = getOnlyNotPlayingVoices(voices);
  const maxIndexExpected = list.length;
  const randomIndex = getRandomIndex(maxIndexExpected);

  // TODO: filter playing voices
  console.log(voices.length);
  console.log(list.length);

  return list[randomIndex];
}
