import api from '@/api';
import constants from '@/utils/constants';
import types from '@/store/voices/utils/types';
import mapTags from '@/store/voices/utils/mapTags';
import mapVoices from '@/store/voices/utils/mapVoices';
import checkSearchValue from '@/store/voices/utils/checkSearchValue';

const { TAGS } = constants;

const {
  RESET_STATE,

  SAVE_SORT,
  SAVE_SEARCH,
  SAVE_TAG,
  SAVE_TAGS,
  SAVE_ALL_VOICES,
  SAVE_FAVOURITE_VOICES,

  FILTER_VOICES,

  TOGGLE_PLAY_VOICE,
  TOGGLE_SEARCH_MODE,
  TOGGLE_FAVOURITE_VOICE,
} = types;

export default {
  /**
   * Get voices
   *
   * @param {object} context - Vuex context
   * @param {Function} context.commit - Vuex commit
   */
  async getVoices({ commit }) {
    try {
      const data = await api.fecthVoices();
      const tags = mapTags(data);
      const voices = mapVoices(data);

      commit(SAVE_TAGS, tags);
      commit(SAVE_ALL_VOICES, voices);

      return true;
    } catch (error) {
      return error;
    }
  },

  /**
   * Toggle play voice
   *
   * @param {object} context - Vuex context
   * @param {Function} context.commit - Vuex commit
   * @param {string} id - The voice id
   */
  togglePlayVoice({ commit }, id) {
    commit(TOGGLE_PLAY_VOICE, id);
  },

  /**
   * Toggle favourite voice
   *
   * @param {object} context - Vuex context
   * @param {Function} context.commit - Vuex commit
   * @param {string} id - The voice id
   */
  toggleFavouriteVoice({ commit }, id) {
    commit(TOGGLE_FAVOURITE_VOICE, id);
    commit(SAVE_FAVOURITE_VOICES);
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
   * Sort voices
   *
   * @param {object} context - Vuex context
   * @param {Function} context.commit - Vuex commit
   */
  sortVoices({ commit }) {
    commit(FILTER_VOICES);
  },

  /**
   * Filter voices by name
   *
   * @param {object} context - Vuex context
   * @param {Function} context.commit - Vuex commit
   * @param {Function} context.state - Module state
   */
  filterVoicesByName({ commit, state }) {
    const isValidValue = checkSearchValue(state.search);

    commit(TOGGLE_SEARCH_MODE, isValidValue);

    if (isValidValue) {
      commit(FILTER_VOICES);
    }

    if (!isValidValue && state.tag !== TAGS.ALL) {
      commit(FILTER_VOICES);
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
   * Filter voices by tag
   *
   * @param {object} context - Vuex context
   * @param {Function} context.commit - Vuex commit
   * @param {Function} context.state - Module state
   */
  filterVoicesByTag({ commit, state }) {
    if (state.tag === TAGS.ALL) {
      commit(RESET_STATE);
    } else {
      commit(FILTER_VOICES);
    }
  },
};
