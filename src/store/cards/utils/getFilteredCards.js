import constants from '@/utils/constants';
import checkSearchValue from '@/store/cards/utils/checkSearchValue';

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
 * Sort cards
 *
 * @param {string} sortType - The sort type
 * @param {string} a - The name to compare
 * @param {string} b - The name to compare
 * @returns {number} - The sorting value
 */
function sortCards(sortType, a, b) {
  if (sortType === SORT.ASC) {
    return sortingByName(a, b);
  }

  return sortingByName(b, a);
}

/**
 * Filter by name
 *
 * @param {object} card - The card data
 * @param {string} value - The value for filter the cards
 * @returns {Array<object>} - The list of cards filtered
 */
function filterByName(card, value) {
  const cardName = card.name.toLowerCase();
  const filterValue = value.toLowerCase();

  return cardName.includes(filterValue);
}

/**
 * Filter by tag
 *
 * @param {object} card - The card data
 * @param {string} tag - The tag for filter the cards
 * @returns {Array<object>} - The list of cards filtered
 */
function filterByTag(card, tag) {
  return card.tags.includes(tag);
}

/**
 * Apply scenario #1
 *
 * Rules:
 *  - The search have a valid value
 *  - The tag 'all' is selected
 *
 * @param {object} payload - The payload data
 * @returns {Array<object>} - The list of cards filtered
 */
function applyScenario1(payload) {
  const { cards, search, sortType } = payload;

  return cards
    .filter((card) => filterByName(card, search))
    .sort((a, b) => sortCards(sortType, a, b));
}

/**
 * Apply scenario #2
 *
 * Rules:
 * - The search have a valid value
 * - The type selected is not 'all'
 *
 * @param {object} payload - The payload data
 * @returns {Array<object>} - The list of cards filtered
 */
function applyScenario2(payload) {
  const {
    cards,
    tag,
    search,
    sortType,
  } = payload;

  return cards
    .filter((card) => filterByTag(card, tag))
    .filter((card) => filterByName(card, search))
    .sort((a, b) => sortCards(sortType, a, b));
}

/**
 * Apply scenario #3
 *
 * Rules:
 * - The search doesn't have a valid value
 * - The tag 'all' is selected
 *
 * @param {object} payload - The payload data
 * @returns {Array<object>} - The list of cards filtered
 */
function applyScenario3(payload) {
  const { cards, sortType } = payload;

  return cards
    .sort((a, b) => sortCards(sortType, a, b));
}

/**
 * Apply scenario #4
 *
 * Rules:
 * - The search doesn't have a valid value
 * - The type selected is not 'all'
 *
 * @param {object} payload - The payload data
 * @returns {Array<object>} - The list of cards filtered
 */
function applyScenario4(payload) {
  const { cards, tag, sortType } = payload;

  return cards
    .filter((card) => filterByTag(card, tag))
    .sort((a, b) => sortCards(sortType, a, b));
}

/**
 * Get the filtered cards
 *
 * @param {object} payload - The payload data
 * @param {Array<object>} payload.cards - The list of cards
 * @param {string} payload.search - The search value for filter the cards
 * @param {string} payload.tag - The type for filter the cards
 * @param {string} payload.sortType - The sort type selected
 * @returns {Array<object>} - The list of cards filtered
 */
export default function getFilteredCards(payload) {
  const { cards, search, tag } = payload;
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

  return cards;
}
