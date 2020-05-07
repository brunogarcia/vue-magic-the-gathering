import constants from '@/utils/constants';

const { TAGS } = constants;

/**
 * Map tags before stored them
 *
 * @param {object} cards - The cards list
 * @returns {Array<string>} - The types list sorted by name
 */
export default function mapTags(cards) {
  return cards
    .map((card) => card.types)
    .reduce((accumulator, types) => {
      const type = types.filter((item) => !accumulator.includes(item));
      return [...accumulator, ...type];
    }, [TAGS.ALL])
    .sort();
}
