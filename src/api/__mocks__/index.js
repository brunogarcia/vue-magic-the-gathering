/**
 * Mock fecth cards for unit testing
 *
 * @async
 * @returns {Promise} - The promise resolve with the cards list
 */
async function fecthCards() {
  return new Promise((res) => res([
    {
      id: '2x1',
      name: '2x1',
      imageUrl: 'image01.png',
      types: [
        'misc',
      ],
    },
    {
      id: '8bits',
      name: '8bits',
      imageUrl: 'image02.png',
      types: [
        'devices',
      ],
    },
    {
      id: 'zombie',
      name: 'Zombie',
      imageUrl: 'image03.png',
      types: [
        'horror',
      ],
    },
  ]));
}

export default {
  fecthCards,
};
