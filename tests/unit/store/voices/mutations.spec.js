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
  TOGGLE_PLAY_VOICE,
  TOGGLE_FAVOURITE_VOICE,
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
      { id: '123' },
      { id: '456' },
      { id: '789' },
    ];

    const state = { all: [], cache: [] };

    mutations[SAVE_ALL_VOICES](state, [
      { id: '123' },
      { id: '456' },
      { id: '789' },
    ]);

    expect(state.all).toEqual(expected);
    expect(state.cache).toEqual(expected);
  });

  it('Save random playing voice', () => {
    const state = {
      playingId: '456',
      all: [
        { id: '123', playing: false },
        { id: '456', playing: true },
      ],
    };

    mutations[SAVE_RANDOM_PLAYING_VOICE](state);

    expect(state.playingId).toEqual('123');
  });

  it('Save playing voice', () => {
    const state = { playingId: null };

    mutations[SAVE_PLAYING_VOICE](state, '123');

    expect(state.playingId).toBe('123');
  });

  it('Toggle play voice: all list', () => {
    const expected = {
      all: [
        { id: '123', playing: false },
        { id: '456', playing: false },
      ],
      cache: [
        { id: '789', playing: false },
        { id: '135', playing: false },
      ],
    };

    const state = {
      playingId: '456',
      all: [
        { id: '123', playing: false },
        { id: '456', playing: true },
      ],
      cache: [
        { id: '789', playing: false },
        { id: '135', playing: false },
      ],
    };

    mutations[TOGGLE_PLAY_VOICE](state);

    expect(state.all).toEqual(expected.all);
    expect(state.cache).toEqual(expected.cache);
  });

  it('Toggle play voice: cache list', () => {
    const expected = {
      all: [
        { id: '123', playing: false },
        { id: '456', playing: false },
      ],
      cache: [
        { id: '789', playing: false },
        { id: '135', playing: false },
      ],
    };

    const state = {
      playingId: '135',
      all: [
        { id: '123', playing: false },
        { id: '456', playing: false },
      ],
      cache: [
        { id: '789', playing: false },
        { id: '135', playing: true },
      ],
    };

    mutations[TOGGLE_PLAY_VOICE](state);

    expect(state.all).toEqual(expected.all);
    expect(state.cache).toEqual(expected.cache);
  });

  it('Toggle favourite voice', () => {
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

    mutations[TOGGLE_FAVOURITE_VOICE](state, id);

    expect(state.all).toEqual(expected);
  });
});
