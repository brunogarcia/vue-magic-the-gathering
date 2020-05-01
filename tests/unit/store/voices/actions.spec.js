import constants from '@/utils/constants';
import actions from '@/store/voices/actions';
import types from '@/store/voices/utils/types';

const { TAGS } = constants;

const {
  RESET_STATE,

  SAVE_SORT,
  SAVE_SEARCH,
  SAVE_TAG,
  SAVE_TAGS,
  SAVE_ALL_VOICES,
  SAVE_PLAYING_VOICE,
  SAVE_RANDOM_PLAYING_VOICE,

  FILTER_VOICES,

  TOGGLE_PLAY_VOICE,
  TOGGLE_SEARCH_MODE,
  TOGGLE_FAVOURITE_VOICE,
} = types;

jest.mock('@/api');

describe('Voices store - Actions', () => {
  it('getVoices', async () => {
    const commit = jest.fn();

    await actions.getVoices({ commit });

    const expected = {
      tags: ['all', 'devices', 'horror', 'misc'],
      voices: [
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

    expect(commit).toHaveBeenCalledWith(SAVE_TAGS, expected.tags);
    expect(commit).toHaveBeenCalledWith(SAVE_ALL_VOICES, expected.voices);
  });

  it('playRandomVoice', async () => {
    const commit = jest.fn();

    await actions.playRandomVoice({ commit });

    expect(commit).toHaveBeenCalledWith(SAVE_RANDOM_PLAYING_VOICE);
    expect(commit).toHaveBeenCalledWith(TOGGLE_PLAY_VOICE);
  });

  it('savePlayingVoice', async () => {
    const commit = jest.fn();

    await actions.savePlayingVoice({ commit }, '12345');

    expect(commit).toHaveBeenCalledWith(SAVE_PLAYING_VOICE, '12345');
  });

  it('togglePlayVoice', async () => {
    const commit = jest.fn();

    await actions.togglePlayVoice({ commit });

    expect(commit).toHaveBeenCalledWith(TOGGLE_PLAY_VOICE);
  });

  it('toggleFavouriteVoice', async () => {
    const commit = jest.fn();

    await actions.toggleFavouriteVoice({ commit }, '12345');

    expect(commit).toHaveBeenCalledWith(TOGGLE_FAVOURITE_VOICE, '12345');
  });

  it('saveSearch', async () => {
    const commit = jest.fn();

    await actions.saveSearch({ commit }, 'zombie');

    expect(commit).toHaveBeenCalledWith(SAVE_SEARCH, 'zombie');
  });

  it('saveSort', async () => {
    const commit = jest.fn();

    await actions.saveSort({ commit }, 'asc');

    expect(commit).toHaveBeenCalledWith(SAVE_SORT, 'asc');
  });

  it('sortVoices', async () => {
    const commit = jest.fn();

    await actions.sortVoices({ commit });

    expect(commit).toHaveBeenCalledWith(FILTER_VOICES);
  });

  it('filterVoicesByName: scenario #1', async () => {
    /**
     * Rules:
     *  - The search value is valid:
     *    - Not null or undefined
     *    - Not an empty string
     *    - Must have a length of 3 chars
     */
    const commit = jest.fn();
    const state = {
      search: 'zombie',
    };

    await actions.filterVoicesByName({ commit, state });

    expect(commit).toHaveBeenCalledWith(TOGGLE_SEARCH_MODE, true);
    expect(commit).toHaveBeenCalledWith(FILTER_VOICES);
  });

  it('filterVoicesByName: scenario #2', async () => {
    /**
     * Rules:
     * - The search value is not valid
     * - The tag selected is not 'all'
     */
    const commit = jest.fn();
    const state = {
      search: null,
      tag: 'horror',
    };

    await actions.filterVoicesByName({ commit, state });

    expect(commit).toHaveBeenCalledWith(TOGGLE_SEARCH_MODE, false);
    expect(commit).toHaveBeenCalledWith(FILTER_VOICES);
  });

  it('filterVoicesByName: scenario #3', async () => {
    /**
     * Rules:
     * - The search value is not valid
     * - The tag selected is 'all'
     */
    const commit = jest.fn();
    const state = {
      search: null,
      tag: TAGS.ALL,
    };

    await actions.filterVoicesByName({ commit, state });

    expect(commit).toHaveBeenCalledWith(TOGGLE_SEARCH_MODE, false);
    expect(commit).toHaveBeenCalledWith(RESET_STATE);
  });

  it('saveTag', async () => {
    const commit = jest.fn();

    await actions.saveTag({ commit }, 'horror');

    expect(commit).toHaveBeenCalledWith(SAVE_TAG, 'horror');
  });

  it('filterVoicesByTag: scenario #1', async () => {
    /**
     * Rules:
     * - The tag selected is 'all'
     */
    const commit = jest.fn();
    const state = {
      tag: TAGS.ALL,
    };

    await actions.filterVoicesByTag({ commit, state });

    expect(commit).toHaveBeenCalledWith(RESET_STATE);
  });

  it('filterVoicesByTag: scenario #2', async () => {
    /**
     * Rules:
     * - The tag selected is not 'all'
     */
    const commit = jest.fn();
    const state = {
      tag: 'horror',
    };

    await actions.filterVoicesByTag({ commit, state });

    expect(commit).toHaveBeenCalledWith(FILTER_VOICES);
  });
});
