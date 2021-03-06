import isNil from 'lodash.isnil';

/**
 * Map cards before stored them
 *
 * @param {Array<object>} cards - The cards to map
 * @returns {Array<object>} - The cards mapped
 */
export default function mapCards(cards) {
  return cards
    .filter((card) => !isNil(card.imageUrl))
    .map((card) => {
      const {
        id,
        name,
        imageUrl,
        types,
        text,
      } = card;

      return {
        id,
        name,
        text,
        imageUrl,
        tags: types,
        playing: false,
        favourite: false,
      };
    });
}
