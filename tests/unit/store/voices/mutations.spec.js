import types from '@/store/voices/utils/types';
import mutations from '@/store/voices/mutations';

const {
  SAVE_SORT,
  SAVE_SEARCH,
  SAVE_TAG,
  SAVE_TAGS,
  SAVE_ALL_VOICES,
  SAVE_RANDOM_PLAYING_VOICE,
  SAVE_PLAYING_VOICE,
} = types;

describe('Mutations', () => {
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

  it('Save voices', () => {
    const expected = [
      { id: 123 },
      { id: 456 },
      { id: 789 },
    ];

    const state = { all: [], cache: [] };

    mutations[SAVE_ALL_VOICES](state, [
      { id: 123 },
      { id: 456 },
      { id: 789 },
    ]);

    expect(state.all).toEqual(expected);
    expect(state.cache).toEqual(expected);
  });

  it('Save random playing voice', () => {
    const state = {
      playingId: 456,
      all: [
        { id: 123, playing: false },
        { id: 456, playing: true },
      ],
    };

    mutations[SAVE_RANDOM_PLAYING_VOICE](state);

    expect(state.playingId).toEqual(123);
  });

  it('Save playing voice', () => {
    const state = { playingId: null };

    mutations[SAVE_PLAYING_VOICE](state, 123);

    expect(state.playingId).toBe(123);
  });
});
