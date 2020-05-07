import types from '@/store/cards/utils/types';
import getRandomCard from '@/store/cards/utils/getRandomCard';
import getPlayingCards from '@/store/cards/utils/getPlayingCards';
import getFilteredCards from '@/store/cards/utils/getFilteredCards';

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

export default {
  /**
   * Save sort value
   *
   * @param {object} state - Module state
   * @param {string} value - The value to store
   */
  [SAVE_SORT](state, value) {
    state.sort = value;
  },

  /**
   * Save seach value
   *
   * @param {object} state - Module state
   * @param {string} value - The value to store
   */
  [SAVE_SEARCH](state, value) {
    state.search = value;
  },

  /**
   * Save tag value
   *
   * @param {object} state - Module state
   * @param {string} value - The value to store
   */
  [SAVE_TAG](state, value) {
    state.tag = value;
  },

  /**
   * Save tags
   *
   * @param {object} state - Module state
   * @param {Array<string>} tags - The tags to store
   */
  [SAVE_TAGS](state, tags) {
    state.tags = tags;
  },

  /**
   * Save cards
   *
   * @param {object} state - Module state
   * @param {object} cards - The cards to store
   */
  [SAVE_ALL_CARDS](state, cards) {
    state.all = cards;
    state.cache = cards;
  },

  /**
   * Save random playing card
   *
   * @param {object} state - Module state
   */
  [SAVE_RANDOM_PLAYING_CARD](state) {
    const card = getRandomCard({
      cards: [...state.all],
      playingId: state.playingId,
    });

    state.playingId = card.id;
  },

  /**
   * Save playing id card
   *
   * @param {object} state - Module state
   * @param {string} id - The card id
   */
  [SAVE_PLAYING_CARD](state, id) {
    state.playingId = id;
  },

  /**
   * Toggle play card
   *
   * @param {object} state - Module state
   */
  [TOGGLE_PLAY_CARD](state) {
    const { all, cache } = getPlayingCards({
      id: state.playingId,
      all: state.all,
      cache: state.cache,
    });

    if (all.length > 0) {
      state.all = all;
    }

    if (cache.length > 0) {
      state.cache = cache;
    }
  },

  /**
   * Toggle favourite card
   *
   * @param {object} state - Module state
   * @param {string} id - The card id
   */
  [TOGGLE_FAVOURITE_CARD](state, id) {
    const temp = [...state.all];

    // Find the index of the card
    const cardIndex = temp.findIndex((card) => card.id === id);

    // If the card exists, update the card
    if (cardIndex !== -1) {
      temp[cardIndex].favourite = !temp[cardIndex].favourite;
      state.all = temp;
    }
  },

  /**
   * Toggle search mode
   *
   * @param {object} state - Module state
   * @param {boolean} value - Flag for checking if the value is valid
   */
  [TOGGLE_SEARCH_MODE](state, value) {
    state.searching = value;
  },

  /**
   * Filter and sort the cards by tag and search value
   *
   * @param {object} state - Module state
   */
  [FILTER_CARDS](state) {
    const {
      tag,
      sort,
      search,
      cache,
    } = state;

    state.all = getFilteredCards({
      tag,
      search,
      sortType: sort,
      cards: cache,
    });
  },

  /**
   * Reset state
   *
   * @param {object} state - Module state
   */
  [RESET_STATE](state) {
    const { cache } = state;
    state.all = [...cache];
  },
};
