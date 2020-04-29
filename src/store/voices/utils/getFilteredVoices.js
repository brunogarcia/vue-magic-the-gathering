/**
 * Get the filtered voices
 *
 * @param {Array<object>} voices - The list of voices
 * @param {string} value - The value for filter the voices
 * @returns {Array<object>} - The list of voices filtered
 */
export default function getFilteredVoices(voices, value) {
  return voices.filter((voice) => {
    const voiceName = voice.name.toLowerCase();
    const filterValue = value.toLowerCase();

    return voiceName.includes(filterValue);
  });
}
