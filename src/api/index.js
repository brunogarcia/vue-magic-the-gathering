
const getVoices = () => import(/* webpackChunkName: "voices" */ './mockData.json');


/**
 * Fecth voices
 *
 * @async
 * @returns {Array<object>} - The voices list
 */
async function fecthVoices() {
  const voices = await getVoices();
  return voices.default;
}

export default {
  fecthVoices,
};
