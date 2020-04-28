/**
 * Get the filtered voices
 *
 * @param {Array<object>} voices - The list of voices stored
 * @param {string} value - The value for filter the voices
 * @returns {Array<object>} - The list of voices filtered
 */
export default function getFilteredVoices(voices, value) {
  return voices.filter((voice) => {
    const name = voice.name.toLowerCase();
    const filterName = value.toLowerCase();

    return name.includes(filterName);
  });
}
