/**
 * Get playing cards
 *
 * @param {object} payload - Thr payload
 * @param {string} payload.id - The plaing card id
 * @param {Array<object>} payload.all - All cards
 * @param {Array<object>} payload.cache - The cache cards
 * @returns {object} - The cards updated
 */
export default function getPlayingCards({ id, all, cache }) {
  const result = { all: {}, cache: {} };
  const tempAll = [...all];
  const tempCache = [...cache];

  // Trying to find the card in the current filter
  const indexAll = tempAll.findIndex((card) => card.id === id);

  // If the card exists in the current filter, update it
  if (indexAll !== -1) {
    tempAll[indexAll].playing = !tempAll[indexAll].playing;
    result.all = tempAll;
  } else {
    // In any other case, find the card in the cache list and update it
    const indexCache = tempCache.findIndex((card) => card.id === id);
    tempCache[indexCache].playing = !tempCache[indexCache].playing;
    result.cache = tempCache;
  }

  return result;
}
