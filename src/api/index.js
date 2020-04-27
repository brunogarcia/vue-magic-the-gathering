
const getVoices = () => import(/* webpackChunkName: "voices" */ './mockData.json');


/**
 * Fecth voices
 *
 * @returns {Promise} - The object promise
 */
async function fecthVoices() {
  const voices = await getVoices();
  return voices.default;
}

export default {
  fecthVoices,
};
