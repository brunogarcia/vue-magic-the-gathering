/**
 * Get playing voices
 *
 * @param {object} payload - Thr payload
 * @param {string} payload.id - The plaing voice id
 * @param {Array<object>} payload.all - All voices
 * @param {Array<object>} payload.cache - The cache voices
 * @returns {object} - The voices updated
 */
export default function getPlayingVoices({ id, all, cache }) {
  const result = { all: {}, cache: {} };
  const tempAll = [...all];
  const tempCache = [...cache];

  // Trying to find the voice in the current filter
  const indexAll = tempAll.findIndex((voice) => voice.id === id);

  // If the voice exists in the current filter, update it
  if (indexAll !== -1) {
    tempAll[indexAll].playing = !tempAll[indexAll].playing;
    result.all = tempAll;
  } else {
    // In any other case, find the voice in the cache list and update it
    const indexCache = tempCache.findIndex((voice) => voice.id === id);
    tempCache[indexCache].playing = !tempCache[indexCache].playing;
    result.cache = tempCache;
  }

  return result;
}
