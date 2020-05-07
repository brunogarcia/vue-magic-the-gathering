
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
 * Filter cards by playing id
 *
 * @param {Array<object>} cards - The cards list
 * @param {string} playingId - Current playing card id
 * @returns {Array<object>} The cards list filtered
 */
function filterCardsByPlayingId(cards, playingId) {
  return cards.filter((card) => card.id !== playingId);
}

/**
 * Get random card
 *
 * @param {object} payload - The payload
 * @param {Array<object>} payload.cards - The cards list
 * @param {string} payload.playingId - Current playing card id
 * @returns {object} The random card
 */
export default function getRandomCard({ cards, playingId }) {
  const list = filterCardsByPlayingId(cards, playingId);
  const maxIndexExpected = list.length;
  const randomIndex = getRandomIndex(maxIndexExpected);

  return list[randomIndex];
}
