import api from '@/api';
import constants from '@/utils/constants';
import types from '@/store/cards/utils/types';
import mapTags from '@/store/cards/utils/mapTags';
import mapCards from '@/store/cards/utils/mapCards';
import checkSearchValue from '@/store/cards/utils/checkSearchValue';

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

export default {
  /**
   * Get cards
   *
   * @param {object} context - Vuex context
   * @param {Function} context.commit - Vuex commit
   */
  async getCards({ commit }) {
    try {
      const data = await api.fecthCards();
      const tags = mapTags(data);
      const cards = mapCards(data);

      commit(SAVE_TAGS, tags);
      commit(SAVE_ALL_CARDS, cards);

      return true;
    } catch (error) {
      return error;
    }
  },

  /**
   * Play random card
   *
   * @param {object} context - Vuex context
   * @param {Function} context.commit - Vuex commit
   */
  playRandomCard({ commit }) {
    commit(SAVE_RANDOM_PLAYING_CARD);
    commit(TOGGLE_PLAY_CARD);
  },

  /**
   * Save playing id card
   *
   * @param {object} context - Vuex context
   * @param {Function} context.commit - Vuex commit
   * @param {string} id - The card id
   */
  savePlayingCard({ commit }, id) {
    commit(SAVE_PLAYING_CARD, id);
  },

  /**
   * Toggle play card
   *
   * @param {object} context - Vuex context
   * @param {Function} context.commit - Vuex commit
   */
  togglePlayCard({ commit }) {
    commit(TOGGLE_PLAY_CARD);
  },

  /**
   * Toggle favourite card
   *
   * @param {object} context - Vuex context
   * @param {Function} context.commit - Vuex commit
   * @param {string} id - The card id
   */
  toggleFavouriteCard({ commit }, id) {
    commit(TOGGLE_FAVOURITE_CARD, id);
  },

  /**
   * Save the search value
   *
   * @param {object} context - Vuex context
   * @param {Function} context.commit - Vuex commit
   * @param {string} value - The value to store
   */
  saveSearch({ commit }, value) {
    commit(SAVE_SEARCH, value);
  },

  /**
   * Save sort
   *
   * @param {object} context - Vuex context
   * @param {Function} context.commit - Vuex commit
   * @param {string} value - The value to store
   */
  saveSort({ commit }, value) {
    commit(SAVE_SORT, value);
  },

  /**
   * Sort cards
   *
   * @param {object} context - Vuex context
   * @param {Function} context.commit - Vuex commit
   */
  sortCards({ commit }) {
    commit(FILTER_CARDS);
  },

  /**
   * Filter cards by name
   *
   * @param {object} context - Vuex context
   * @param {Function} context.commit - Vuex commit
   * @param {Function} context.state - Module state
   */
  filterCardsByName({ commit, state }) {
    const isValidValue = checkSearchValue(state.search);

    commit(TOGGLE_SEARCH_MODE, isValidValue);

    if (isValidValue) {
      commit(FILTER_CARDS);
    }

    if (!isValidValue && state.tag !== TAGS.ALL) {
      commit(FILTER_CARDS);
    }

    if (!isValidValue && state.tag === TAGS.ALL) {
      commit(RESET_STATE);
    }
  },

  /**
   * Save tag
   *
   * @param {object} context - Vuex context
   * @param {Function} context.commit - Vuex commit
   * @param {string} value - The value to store
   */
  saveTag({ commit }, value) {
    commit(SAVE_TAG, value);
  },

  /**
   * Filter cards by tag
   *
   * @param {object} context - Vuex context
   * @param {Function} context.commit - Vuex commit
   * @param {Function} context.state - Module state
   */
  filterCardsByTag({ commit, state }) {
    if (state.tag === TAGS.ALL) {
      commit(RESET_STATE);
    } else {
      commit(FILTER_CARDS);
    }
  },
};
