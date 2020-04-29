import constants from '@/utils/constants';
import checkSearchValue from '@/store/voices/utils/checkSearchValue';

const { TAGS } = constants;

/**
 * Filter by name
 *
 * @param {object} voice - The voice data
 * @param {string} value - The value for filter the voices
 * @returns {Array<object>} - The list of voices filtered
 */
function filterByName(voice, value) {
  const voiceName = voice.name.toLowerCase();
  const filterValue = value.toLowerCase();

  return voiceName.includes(filterValue);
}

/**
 * Filter by tag
 *
 * @param {object} voice - The voice data
 * @param {string} tag - The tag for filter the voices
 * @returns {Array<object>} - The list of voices filtered
 */
function filterByTag(voice, tag) {
  return voice.tags.includes(tag);
}

/**
 * Get the filtered voices by tag and name
 *
 * @param {object} payload - The payload data
 * @param {Array<object>} payload.voices - The list of voices
 * @param {string} payload.search - The search value for filter the voices
 * @param {string} payload.tag - The tag for filter the voices
 * @returns {Array<object>} - The list of voices filtered
 */
export default function getFilteredVoicesByName({ voices, search, tag }) {
  const isValidSearchValue = checkSearchValue(search);

  if (tag === TAGS.ALL) {
    return voices
      .filter((voice) => filterByName(voice, search));
  }

  if (!isValidSearchValue) {
    return voices
      .filter((voice) => filterByTag(voice, tag));
  }

  return voices
    .filter((voice) => filterByTag(voice, tag))
    .filter((voice) => filterByName(voice, search));
}
