import api from '@/api';
import constants from '@/utils/constants';
import types from '@/store/voices/utils/types';
import mapTags from '@/store/voices/utils/mapTags';
import mapVoices from '@/store/voices/utils/mapVoices';
import getFilteredVoices from '@/store/voices/utils/getFilteredVoices';
import validateFilterValue from '@/store/voices/utils/validateFilterValue';

const { FILTERS } = constants;

const {
  SAVE_TAGS,
  SAVE_VOICES,
  FILTER_VOICES_BY_TAG,
  FILTER_VOICES_BY_NAME,
  TOGGLE_SEARCH_MODE,
  TOGGLE_FAVOURITE_VOICE,
} = types;

export default {
  namespaced: true,
  state: {
    tags: [],
    searching: false,
    all: [],
    cache: [],
    allFiltered: [],
    favourite: [],
    favouriteFiltered: [],
  },
  actions: {
    /**
     * Get voices
     *
     * @param {object} context - Vuex context
     * @param {Function} context.commit - Vuex commit
     */
    async getVoices({ commit }) {
      try {
        const data = await api.fecthVoices();

        commit(SAVE_TAGS, mapTags(data));
        commit(SAVE_VOICES, mapVoices(data));
        return true;
      } catch (error) {
        return error;
      }
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
    },

    /**
     * Filter voices by name
     *
     * @param {object} context - Vuex context
     * @param {Function} context.commit - Vuex commit
     * @param {string} value - The value for filter the voices
     */
    filterVoicesByName({ commit }, value) {
      const isValidValue = validateFilterValue(value);

      commit(TOGGLE_SEARCH_MODE, isValidValue);
      commit(FILTER_VOICES_BY_NAME, { value, isValidValue });
    },

    /**
     * Filter voices by tag
     *
     * @param {object} context - Vuex context
     * @param {Function} context.commit - Vuex commit
     * @param {string} tag - The tag for filter the voices
     */
    filterVoicesByTag({ commit }, tag) {
      commit(FILTER_VOICES_BY_TAG, tag);
    },
  },
  mutations: {
    /**
     * Save voices
     *
     * @param {object} state - Vuex state
     * @param {object} voices - The voices to store
     */
    [SAVE_VOICES](state, voices) {
      state.all = voices;
      state.cache = voices;
    },

    /**
     * Save tags
     *
     * @param {object} state - Vuex state
     * @param {Array<string>} tags - The tags to store
     */
    [SAVE_TAGS](state, tags) {
      state.tags = tags;
    },

    /**
     * Toggle favourite voice
     *
     * @param {object} state - Vuex state
     * @param {string} id - The voice id
     */
    [TOGGLE_FAVOURITE_VOICE](state, id) {
      const { all } = state;

      // Find the index of the voice
      const voiceIndex = all.findIndex((voice) => voice.id === id);

      // Update the voice
      all[voiceIndex].favourite = !all[voiceIndex].favourite;

      // Update the voices list
      state.all = all;

      // Update the favourite voices list
      state.favourite = all.filter((voice) => voice.favourite);
    },

    /**
     * Toggle search mode
     *
     * @param {object} state - Vuex state
     * @param {boolean} isValidValue - Flag for checking if the value is valid
     */
    [TOGGLE_SEARCH_MODE](state, isValidValue) {
      state.searching = isValidValue;
    },

    /**
     * Filter voices by name
     *
     * @param {object} state - Vuex state
     * @param {object} payload - The payload
     * @param {string} payload.value - The value for filter the voices
     * @param {boolean} payload.isValidValue - Flag for checking if the value is valid
     */
    [FILTER_VOICES_BY_NAME](state, { value, isValidValue }) {
      const { all, favourite } = state;

      // Update the all filtered list
      state.allFiltered = !isValidValue
        ? []
        : getFilteredVoices(all, value);

      // Update the favourite filtered list
      state.favouriteFiltered = !isValidValue
        ? []
        : getFilteredVoices(favourite, value);
    },

    /**
     * Filter voices by tag
     *
     * @param {object} state - Vuex state
     * @param {string} tag - The tag for filter the voices
     */
    [FILTER_VOICES_BY_TAG](state, tag) {
      const { cache } = state;

      if (tag === FILTERS.ALL) {
        state.all = cache;
      } else {
        state.all = cache.filter((item) => item.tags.includes(tag));
      }
    },
  },
  getters: {
    /**
     * Get search mode
     *
     * @param {object} state - The state of the module
     * @returns {boolean} - The searching mode
     */
    searching: (state) => state.searching,

    /**
     * Get the tags
     *
     * @param {object} state - The state of the module
     * @returns {Array<string>} - The tags stored
     */
    tags: (state) => state.tags,

    /**
     * Get all the voices
     *
     * @param {object} state - The state of the module
     * @returns {Array<object>} - The voices stored
     */
    all: (state) => state.all,

    /**
     * Get the filtered voices
     *
     * @param {object} state - The state of the module
     * @returns {Array<object>} - The voices filtered
     */
    allFiltered: (state) => state.allFiltered,

    /**
     * Get the favourite voices
     *
     * @param {object} state - The state of the module
     * @returns {Array<object>} - The favourite voices
     */
    favourite: (state) => state.favourite,

    /**
     * Get the favourite filtered voices
     *
     * @param {object} state - The state of the module
     * @returns {Array<object>} - The favourite filtered voices
     */
    favouriteFiltered: (state) => state.favouriteFiltered,

    /**
     * Show favourite voices
     *
     * @param {object} state - The state of the module
     * @returns {boolean} - The validation flag
     */
    showFavourite: (state) => state.favourite.length > 0 || state.favouriteFiltered.length > 0,
  },
};
