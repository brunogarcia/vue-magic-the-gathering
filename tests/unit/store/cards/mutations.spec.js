import constants from '@/utils/constants';
import types from '@/store/cards/utils/types';
import mutations from '@/store/cards/mutations';

const { SORT, TAGS } = constants;

const {
  RESET_STATE,

  SAVE_SORT,
  SAVE_SEARCH,
  SAVE_TAG,
  SAVE_TAGS,
  SAVE_ALL_CARDS,

  PLAY_CARD,
  PLAY_RANDOM_CARD,

  FILTER_CARDS,

  TOGGLE_SEARCH_MODE,
  TOGGLE_FAVOURITE_CARD,
} = types;

describe('Voices store - Mutations', () => {
  it('Save sort', () => {
    const state = { sort: null };

    mutations[SAVE_SORT](state, 'asc');

    expect(state.sort).toBe('asc');
  });

  it('Save search', () => {
    const state = { search: null };

    mutations[SAVE_SEARCH](state, 'Zombie');

    expect(state.search).toBe('Zombie');
  });

  it('Save tag', () => {
    const state = { tag: null };

    mutations[SAVE_TAG](state, 'Horror');

    expect(state.tag).toBe('Horror');
  });

  it('Save tags', () => {
    const state = { tags: [] };

    mutations[SAVE_TAGS](state, ['Horror', 'Tech']);

    expect(state.tags).toEqual(['Horror', 'Tech']);
  });

  it('Save cards', () => {
    const expected = [
      { id: '123' },
      { id: '456' },
      { id: '789' },
    ];

    const state = { all: [], cache: [] };

    mutations[SAVE_ALL_CARDS](state, [
      { id: '123' },
      { id: '456' },
      { id: '789' },
    ]);

    expect(state.all).toEqual(expected);
    expect(state.cache).toEqual(expected);
  });

  it('Save random playing card', () => {
    const state = {
      playingId: '456',
      all: [
        { id: '123', playing: false },
        { id: '456', playing: true },
      ],
    };

    mutations[PLAY_RANDOM_CARD](state);

    expect(state.playingId).toEqual('123');
  });

  it('Play card', () => {
    const state = { playingId: null };

    mutations[PLAY_CARD](state, '123');

    expect(state.playingId).toBe('123');
  });

  it('Toggle favourite card with a valid id', () => {
    const id = '789';

    const expected = [
      { id: '123', favourite: false },
      { id: '456', favourite: false },
      { id: '789', favourite: true },
      { id: '159', favourite: false },
    ];

    const state = {
      all: [
        { id: '123', favourite: false },
        { id: '456', favourite: false },
        { id: '789', favourite: false },
        { id: '159', favourite: false },
      ],
    };

    mutations[TOGGLE_FAVOURITE_CARD](state, id);

    expect(state.all).toEqual(expected);
  });

  it('Toggle favourite card with an invalid id', () => {
    const id = '999';

    const expected = [
      { id: '123', favourite: false },
      { id: '456', favourite: false },
      { id: '789', favourite: false },
      { id: '159', favourite: false },
    ];

    const state = {
      all: [
        { id: '123', favourite: false },
        { id: '456', favourite: false },
        { id: '789', favourite: false },
        { id: '159', favourite: false },
      ],
    };

    mutations[TOGGLE_FAVOURITE_CARD](state, id);

    expect(state.all).toEqual(expected);
  });

  it('Toggle search mode', () => {
    const state = { searching: false };

    mutations[TOGGLE_SEARCH_MODE](state, true);

    expect(state.searching).toBeTruthy();
  });

  it('Reset state', () => {
    const expected = [
      { id: '123', favourite: false },
      { id: '456', favourite: false },
      { id: '789', favourite: false },
      { id: '159', favourite: false },
    ];

    const state = {
      all: [
        { id: '123', favourite: false },
      ],
      cache: [
        { id: '123', favourite: false },
        { id: '456', favourite: false },
        { id: '789', favourite: false },
        { id: '159', favourite: false },
      ],
    };

    mutations[RESET_STATE](state);

    expect(state.all).toEqual(expected);
  });

  it('Filter cards: scenario #1', () => {
    /**
     * Rules:
     *  - The search have a valid value
     *  - The tag 'all' is selected
     */
    const expected = [
      {
        id: 'zombie',
        name: 'Zombie',
        tags: [
          'horror',
        ],
      },
    ];

    const state = {
      tag: TAGS.ALL,
      sort: SORT.ASC,
      search: 'zombie',
      cache: [
        {
          id: '2x1',
          name: '2x1',
          tags: [
            'misc',
          ],
        },
        {
          id: 'dark',
          name: 'Dark',
          tags: [
            'character',
          ],
        },
        {
          id: 'kong',
          name: 'Kong',
          tags: [
            'character',
          ],
        },
        {
          id: 'zombie',
          name: 'Zombie',
          tags: [
            'horror',
          ],
        },
      ],
    };

    mutations[FILTER_CARDS](state);

    expect(state.all).toEqual(expected);
  });

  it('Filter cards: scenario #2', () => {
    /**
     * Rules:
     *  - The search have a valid value
     *  - The tag selected is not 'all'
     */
    const expected = [
      {
        id: 'dark',
        name: 'Dark',
        tags: [
          'character',
        ],
      },
    ];

    const state = {
      tag: 'character',
      sort: SORT.ASC,
      search: 'dark',
      cache: [
        {
          id: '2x1',
          name: '2x1',
          tags: [
            'misc',
          ],
        },
        {
          id: 'dark',
          name: 'Dark',
          tags: [
            'character',
          ],
        },
        {
          id: 'kong',
          name: 'Kong',
          tags: [
            'character',
          ],
        },
        {
          id: 'zombie',
          name: 'Zombie',
          tags: [
            'horror',
          ],
        },
      ],
    };

    mutations[FILTER_CARDS](state);

    expect(state.all).toEqual(expected);
  });

  it('Filter cards: scenario #3', () => {
    /**
     * Rules:
     *  - The search doesn't have a valid value
     *  - The tag 'all' is selected
     */
    const expected = [
      {
        id: 'zombie',
        name: 'Zombie',
        tags: [
          'horror',
        ],
      },
      {
        id: 'kong',
        name: 'Kong',
        tags: [
          'character',
        ],
      },
      {
        id: 'dark',
        name: 'Dark',
        tags: [
          'character',
        ],
      },
      {
        id: '2x1',
        name: '2x1',
        tags: [
          'misc',
        ],
      },
    ];

    const state = {
      tag: TAGS.ALL,
      sort: SORT.DESC,
      search: null,
      cache: [
        {
          id: '2x1',
          name: '2x1',
          tags: [
            'misc',
          ],
        },
        {
          id: 'dark',
          name: 'Dark',
          tags: [
            'character',
          ],
        },
        {
          id: 'kong',
          name: 'Kong',
          tags: [
            'character',
          ],
        },
        {
          id: 'zombie',
          name: 'Zombie',
          tags: [
            'horror',
          ],
        },
      ],
    };

    mutations[FILTER_CARDS](state);

    expect(state.all).toEqual(expected);
  });

  it('Filter cards: scenario #4', () => {
    /**
     * Rules:
     *  - The search doesn't have a valid value
     *  - The tag selected is not 'all'
     */
    const expected = [
      {
        id: 'dark',
        name: 'Dark',
        tags: [
          'character',
        ],
      },
      {
        id: 'kong',
        name: 'Kong',
        tags: [
          'character',
        ],
      },
    ];

    const state = {
      tag: 'character',
      sort: SORT.ASC,
      search: null,
      cache: [
        {
          id: '2x1',
          name: '2x1',
          tags: [
            'misc',
          ],
        },
        {
          id: 'dark',
          name: 'Dark',
          tags: [
            'character',
          ],
        },
        {
          id: 'kong',
          name: 'Kong',
          tags: [
            'character',
          ],
        },
        {
          id: 'zombie',
          name: 'Zombie',
          tags: [
            'horror',
          ],
        },
      ],
    };

    mutations[FILTER_CARDS](state);

    expect(state.all).toEqual(expected);
  });
});
