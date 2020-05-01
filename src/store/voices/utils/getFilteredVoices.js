import constants from '@/utils/constants';
import checkSearchValue from '@/store/voices/utils/checkSearchValue';

const { SORT, TAGS } = constants;

/**
 * Sorting by name
 *
 * @param {string} a - The name to compare
 * @param {string} b - The name to compare
 * @returns {number} - The sorting value
 */
function sortingByName(a, b) {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  if (nameA < nameB) {
    return -1;
  }

  if (nameA > nameB) {
    return 1;
  }

  return 0;
}

/**
 * Sort voices
 *
 * @param {string} sortType - The sort type
 * @param {string} a - The name to compare
 * @param {string} b - The name to compare
 * @returns {number} - The sorting value
 */
function sortVoices(sortType, a, b) {
  if (sortType === SORT.ASC) {
    return sortingByName(a, b);
  }

  return sortingByName(b, a);
}

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
 * Apply scenario #1
 *
 * Rules:
 *  - The search have a valid value
 *  - The tag 'all' is selected
 *
 * @param {object} payload - The payload data
 * @returns {Array<object>} - The list of voices filtered
 */
function applyScenario1(payload) {
  const { voices, search, sortType } = payload;

  return voices
    .filter((voice) => filterByName(voice, search))
    .sort((a, b) => sortVoices(sortType, a, b));
}

/**
 * Apply scenario #2
 *
 * Rules:
 * - The search have a valid value
 * - The tag selected is not 'all'
 *
 * @param {object} payload - The payload data
 * @returns {Array<object>} - The list of voices filtered
 */
function applyScenario2(payload) {
  const {
    voices,
    tag,
    search,
    sortType,
  } = payload;

  return voices
    .filter((voice) => filterByTag(voice, tag))
    .filter((voice) => filterByName(voice, search))
    .sort((a, b) => sortVoices(sortType, a, b));
}

/**
 * Apply scenario #3
 *
 * Rules:
 * - The search doesn't have a valid value
 * - The tag 'all' is selected
 *
 * @param {object} payload - The payload data
 * @returns {Array<object>} - The list of voices filtered
 */
function applyScenario3(payload) {
  const { voices, sortType } = payload;

  return voices
    .sort((a, b) => sortVoices(sortType, a, b));
}

/**
 * Apply scenario #4
 *
 * Rules:
 * - The search doesn't have a valid value
 * - The tag selected is not 'all'
 *
 * @param {object} payload - The payload data
 * @returns {Array<object>} - The list of voices filtered
 */
function applyScenario4(payload) {
  const { voices, tag, sortType } = payload;

  return voices
    .filter((voice) => filterByTag(voice, tag))
    .sort((a, b) => sortVoices(sortType, a, b));
}

/**
 * Get the filtered voices
 *
 * @param {object} payload - The payload data
 * @param {Array<object>} payload.voices - The list of voices
 * @param {string} payload.search - The search value for filter the voices
 * @param {string} payload.tag - The tag for filter the voices
 * @param {string} payload.sortType - The sort type selected
 * @returns {Array<object>} - The list of voices filtered
 */
export default function getFilteredVoices(payload) {
  const { voices, search, tag } = payload;
  const isValidSearchValue = checkSearchValue(search);

  const scenario1 = isValidSearchValue && tag === TAGS.ALL;
  const scenario2 = isValidSearchValue && tag !== TAGS.ALL;
  const scenario3 = !isValidSearchValue && tag === TAGS.ALL;
  const scenario4 = !isValidSearchValue && tag !== TAGS.ALL;

  if (scenario1) {
    return applyScenario1(payload);
  }

  if (scenario2) {
    return applyScenario2(payload);
  }

  if (scenario3) {
    return applyScenario3(payload);
  }

  if (scenario4) {
    return applyScenario4(payload);
  }

  return voices;
}
