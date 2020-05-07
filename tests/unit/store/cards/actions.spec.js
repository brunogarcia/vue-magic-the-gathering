import constants from '@/utils/constants';
import actions from '@/store/cards/actions';
import types from '@/store/cards/utils/types';

const { TAGS } = constants;

const {
  RESET_STATE,

  SAVE_SORT,
  SAVE_SEARCH,
  SAVE_TAG,
  SAVE_TAGS,
  SAVE_ALL_CARDS,
  SAVE_PLAYING_CARD,
  SAVE_RANDOM_PLAYING_CARD,

  FILTER_CARDS,

  TOGGLE_PLAY_CARD,
  TOGGLE_SEARCH_MODE,
  TOGGLE_FAVOURITE_CARD,
} = types;

jest.mock('@/api');

describe('Cards store - Actions', () => {
  it('getCards', async () => {
    const commit = jest.fn();

    await actions.getCards({ commit });

    const expected = {
      tags: ['all', 'devices', 'horror', 'misc'],
      cards: [
        {
          id: '2x1',
          name: '2x1',
          imageUrl: 'image01.png',
          tags: ['misc'],
          playing: false,
          favourite: false,
        },
        {
          id: '8bits',
          name: '8bits',
          imageUrl: 'image02.png',
          tags: ['devices'],
          playing: false,
          favourite: false,
        },
        {
          id: 'zombie',
          name: 'Zombie',
          imageUrl: 'image03.png',
          tags: ['horror'],
          playing: false,
          favourite: false,
        },
      ],
    };

    expect(commit).toHaveBeenCalledWith(SAVE_TAGS, expected.tags);
    expect(commit).toHaveBeenCalledWith(SAVE_ALL_CARDS, expected.cards);
  });

  it('playRandomCard', async () => {
    const commit = jest.fn();

    await actions.playRandomCard({ commit });

    expect(commit).toHaveBeenCalledWith(SAVE_RANDOM_PLAYING_CARD);
    expect(commit).toHaveBeenCalledWith(TOGGLE_PLAY_CARD);
  });

  it('savePlayingCard', async () => {
    const commit = jest.fn();

    await actions.savePlayingCard({ commit }, '12345');

    expect(commit).toHaveBeenCalledWith(SAVE_PLAYING_CARD, '12345');
  });

  it('togglePlayCard', async () => {
    const commit = jest.fn();

    await actions.togglePlayCard({ commit });

    expect(commit).toHaveBeenCalledWith(TOGGLE_PLAY_CARD);
  });

  it('toggleFavouriteCard', async () => {
    const commit = jest.fn();

    await actions.toggleFavouriteCard({ commit }, '12345');

    expect(commit).toHaveBeenCalledWith(TOGGLE_FAVOURITE_CARD, '12345');
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

  it('sortCards', async () => {
    const commit = jest.fn();

    await actions.sortCards({ commit });

    expect(commit).toHaveBeenCalledWith(FILTER_CARDS);
  });

  it('filterCardsByName: scenario #1', async () => {
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

    await actions.filterCardsByName({ commit, state });

    expect(commit).toHaveBeenCalledWith(TOGGLE_SEARCH_MODE, true);
    expect(commit).toHaveBeenCalledWith(FILTER_CARDS);
  });

  it('filterCardsByName: scenario #2', async () => {
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

    await actions.filterCardsByName({ commit, state });

    expect(commit).toHaveBeenCalledWith(TOGGLE_SEARCH_MODE, false);
    expect(commit).toHaveBeenCalledWith(FILTER_CARDS);
  });

  it('filterCardsByName: scenario #3', async () => {
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

    await actions.filterCardsByName({ commit, state });

    expect(commit).toHaveBeenCalledWith(TOGGLE_SEARCH_MODE, false);
    expect(commit).toHaveBeenCalledWith(RESET_STATE);
  });

  it('saveTag', async () => {
    const commit = jest.fn();

    await actions.saveTag({ commit }, 'horror');

    expect(commit).toHaveBeenCalledWith(SAVE_TAG, 'horror');
  });

  it('filterCardsByTag: scenario #1', async () => {
    /**
     * Rules:
     * - The tag selected is 'all'
     */
    const commit = jest.fn();
    const state = {
      tag: TAGS.ALL,
    };

    await actions.filterCardsByTag({ commit, state });

    expect(commit).toHaveBeenCalledWith(RESET_STATE);
  });

  it('filterCardsByTag: scenario #2', async () => {
    /**
     * Rules:
     * - The tag selected is not 'all'
     */
    const commit = jest.fn();
    const state = {
      tag: 'horror',
    };

    await actions.filterCardsByTag({ commit, state });

    expect(commit).toHaveBeenCalledWith(FILTER_CARDS);
  });
});
