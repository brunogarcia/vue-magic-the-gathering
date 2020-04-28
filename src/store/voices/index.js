import api from '@/api';
import types from './utils/types';
import mapVoices from './utils/mapVoices';
import getFilteredVoices from './utils/getFilteredVoices';
import validateFilterValue from './utils/validateFilterValue';

const {
  SAVE_VOICES,
  FILTER_VOICES,
  SAVE_FAVOURITE_VOICE,
} = types;

export default {
  namespaced: true,
  state: {
    searching: false,
    all: [],
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
        commit(SAVE_VOICES, mapVoices(data));
        return true;
      } catch (error) {
        return error;
      }
    },

    /**
     * Save favourite voice
     *
     * @param {object} context - Vuex context
     * @param {Function} context.commit - Vuex commit
     * @param {string} id - The voice id to update
     */
    saveFavouriteVoice({ commit }, id) {
      commit(SAVE_FAVOURITE_VOICE, id);
    },

    /**
     * Filter voices
     *
     * @param {object} context - Vuex context
     * @param {Function} context.commit - Vuex commit
     * @param {string} value - The value for filter the voices
     */
    filterVoices({ commit }, value) {
      commit(FILTER_VOICES, value);
    },
  },
  mutations: {
    /**
     * Save voices
     *
     * @param {object} state - Vuex state
     * @param {object} payload - The voices to store
     */
    [SAVE_VOICES](state, payload) {
      state.all = payload;
    },

    /**
     * Save favourite voice
     *
     * @param {object} state - Vuex state
     * @param {string} id - The voice id to update
     */
    [SAVE_FAVOURITE_VOICE](state, id) {
      const { all } = state;
      const voiceIndex = all.findIndex((voice) => voice.id === id);

      all[voiceIndex].favourite = !all[voiceIndex].favourite;

      state.all = all;
      state.favourite = all.filter((voice) => voice.favourite);
    },

    /**
     * Filter voices
     *
     * @param {object} state - Vuex state
     * @param {string} value - The value for filter the voices
     */
    [FILTER_VOICES](state, value) {
      const { all, favourite } = state;
      const isValidValue = validateFilterValue(value);

      // Apply searching mode
      state.searching = isValidValue;

      // Update all filtered list
      state.allFiltered = !isValidValue
        ? []
        : getFilteredVoices(all, value);

      // Update favourite filtered list
      state.favouriteFiltered = !isValidValue
        ? []
        : getFilteredVoices(favourite, value);
    },
  },
  getters: {
    /**
     * Get searching mode
     *
     * @param {object} state - The state of the module
     * @returns {boolean} - The searching mode
     */
    searching: (state) => state.searching,

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
     * Show favourite voices
     *
     * @param {object} state - The state of the module
     * @returns {boolean} - The validation flag
     */
    showFavourite: (state) => state.favourite.length > 0 || state.favouriteFiltered.length > 0,

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
  },
};
