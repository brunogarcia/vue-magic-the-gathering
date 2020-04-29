/**
 * Get the filtered voices by tag
 *
 * @param {Array<object>} voices - The list of voices
 * @param {string} tag - The tag for filter the voices
 * @returns {Array<object>} - The list of voices filtered
 */
export default function getFilteredVoicesByTag(voices, tag) {
  return voices.filter((item) => item.tags.includes(tag));
}
