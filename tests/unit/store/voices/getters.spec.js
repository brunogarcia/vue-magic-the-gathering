import getters from '@/store/voices/getters';

describe('Voices store - Getters', () => {
  it('playingId', () => {
    const state = { playingId: '12345' };
    const actual = getters.playingId(state);
    expect(actual).toBe('12345');
  });

  it('searching', () => {
    const state = { searching: true };
    const actual = getters.searching(state);
    expect(actual).toBe(true);
  });

  it('tag', () => {
    const state = { tag: 'horror' };
    const actual = getters.tag(state);
    expect(actual).toBe('horror');
  });

  it('tags', () => {
    const state = { tags: ['horror', 'devices', 'misc'] };
    const actual = getters.tags(state);
    expect(actual).toEqual(['horror', 'devices', 'misc']);
  });

  it('all', () => {
    const expected = [
      {
        id: '2x1',
        name: '2x1',
        icon: 'VoicesVoiceIcon01.png',
        tags: ['misc'],
        playing: false,
        favourite: false,
      },
      {
        id: '8bits',
        name: '8bits',
        icon: 'VoicesVoiceIcon02.png',
        tags: ['devices'],
        playing: false,
        favourite: false,
      },
      {
        id: 'zombie',
        name: 'Zombie',
        icon: 'VoicesVoiceIcon03.png',
        tags: ['horror'],
        playing: false,
        favourite: false,
      },
    ];

    const state = {
      all: [
        {
          id: '2x1',
          name: '2x1',
          icon: 'VoicesVoiceIcon01.png',
          tags: ['misc'],
          playing: false,
          favourite: false,
        },
        {
          id: '8bits',
          name: '8bits',
          icon: 'VoicesVoiceIcon02.png',
          tags: ['devices'],
          playing: false,
          favourite: false,
        },
        {
          id: 'zombie',
          name: 'Zombie',
          icon: 'VoicesVoiceIcon03.png',
          tags: ['horror'],
          playing: false,
          favourite: false,
        },
      ],
    };

    const actual = getters.all(state);

    expect(actual).toEqual(expected);
  });

  it('favourite', () => {
    const expected = [
      {
        id: '2x1',
        name: '2x1',
        icon: 'VoicesVoiceIcon01.png',
        tags: ['misc'],
        playing: false,
        favourite: true,
      },
    ];

    const state = {
      all: [
        {
          id: '2x1',
          name: '2x1',
          icon: 'VoicesVoiceIcon01.png',
          tags: ['misc'],
          playing: false,
          favourite: true,
        },
        {
          id: '8bits',
          name: '8bits',
          icon: 'VoicesVoiceIcon02.png',
          tags: ['devices'],
          playing: false,
          favourite: false,
        },
        {
          id: 'zombie',
          name: 'Zombie',
          icon: 'VoicesVoiceIcon03.png',
          tags: ['horror'],
          playing: false,
          favourite: false,
        },
      ],
    };

    const actual = getters.favourite(state);
    expect(actual).toEqual(expected);
  });
});
