/**
 * Mock fecth voices for unit testing
 *
 * @async
 * @returns {Array<object>} - The voices list
 */
async function fecthVoices() {
  return [
    {
      id: '2x1',
      name: '2x1',
      icon: 'VoicesVoiceIcon01.png',
      tags: [
        'misc',
      ],
    },
    {
      id: '8bits',
      name: '8bits',
      icon: 'VoicesVoiceIcon02.png',
      tags: [
        'devices',
      ],
    },
    {
      id: 'zombie',
      name: 'Zombie',
      icon: 'VoicesVoiceIcon03.png',
      tags: [
        'horror',
      ],
    },
  ];
}

export default {
  fecthVoices,
};
