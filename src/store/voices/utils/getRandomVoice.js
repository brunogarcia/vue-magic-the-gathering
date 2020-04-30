
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
 * Filter voices by playing id
 *
 * @param {Array<object>} voices - The voices list
 * @param {string} playingId - Current playing voice id
 * @returns {Array<object>} The voices list filtered
 */
function filterVoicesByPlayingId(voices, playingId) {
  return voices.filter((voice) => voice.id !== playingId);
}

/**
 * Get random voice
 *
 * @param {object} payload - The payload
 * @param {Array<object>} payload.voices - The voices list
 * @param {string} payload.playingId - Current playing voice id
 * @returns {object} The random voice
 */
export default function getRandomVoice({ voices, playingId }) {
  const list = filterVoicesByPlayingId(voices, playingId);
  const maxIndexExpected = list.length;
  const randomIndex = getRandomIndex(maxIndexExpected);

  return list[randomIndex];
}
