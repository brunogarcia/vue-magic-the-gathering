import api from '@/api';
import constants from '@/utils/constants';
import types from '@/store/voices/utils/types';
import mapTags from '@/store/voices/utils/mapTags';
import mapVoices from '@/store/voices/utils/mapVoices';
import checkSearchValue from '@/store/voices/utils/checkSearchValue';
import getFilteredVoices from '@/store/voices/utils/getFilteredVoices';

const { SORT, TAGS } = constants;

const {
  RESET_STATE,

  SAVE_SORT,
  SAVE_SEARCH,
  SAVE_TAG,
  SAVE_TAGS,
  SAVE_ALL_VOICES,
  SAVE_FAVOURITE_VOICES,

  FILTER_VOICES,
  SORT_VOICES,

  TOGGLE_SEARCH_MODE,
  TOGGLE_FAVOURITE_VOICE,
} = types;

export default {
  namespaced: true,
  state: {
    sort: SORT.ASC,
    tag: TAGS.ALL,
    tags: [],
    search: null,
    searching: false,
    all: [],
    allCache: [],
    favourite: [],
    favouriteCache: [],
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
      commit(SORT_VOICES);
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
  },
  mutations: {
    /**
     * Save sort value
     *
     * @param {object} state - Vuex state
     * @param {string} value - The value to store
     */
    [SAVE_SORT](state, value) {
      state.sort = value;
    },

    /**
     * Save seach value
     *
     * @param {object} state - Vuex state
     * @param {string} value - The value to store
     */
    [SAVE_SEARCH](state, value) {
      state.search = value;
    },

    /**
     * Save tag value
     *
     * @param {object} state - Vuex state
     * @param {string} value - The value to store
     */
    [SAVE_TAG](state, value) {
      state.tag = value;
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
     * Save voices
     *
     * @param {object} state - Vuex state
     * @param {object} voices - The voices to store
     */
    [SAVE_ALL_VOICES](state, voices) {
      state.all = voices;
      state.allCache = voices;
    },

    /**
     * Save favourite voices
     *
     * @param {object} state - Vuex state
     */
    [SAVE_FAVOURITE_VOICES](state) {
      const voices = state.all.filter((voice) => voice.favourite);
      state.favourite = voices;
      state.favouriteCache = voices;
    },

    /**
     * Toggle favourite voice
     *
     * @param {object} state - Vuex state
     * @param {string} id - The voice id
     */
    [TOGGLE_FAVOURITE_VOICE](state, id) {
      const temp = [...state.all];

      // Find the index of the voice
      const voiceIndex = temp.findIndex((voice) => voice.id === id);

      // Update the voice
      temp[voiceIndex].favourite = !temp[voiceIndex].favourite;

      state.all = temp;
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
     * Filter voices by tag and name
     *
     * @param {object} state - Vuex state
     */
    [FILTER_VOICES](state) {
      const {
        tag,
        search,
        allCache,
        favouriteCache,
      } = state;

      state.all = getFilteredVoices({ voices: allCache, search, tag });
      state.favourite = getFilteredVoices({ voices: favouriteCache, search, tag });
    },

    /**
     * Sort voices
     *
     * @param {object} state - Vuex state
     */
    [SORT_VOICES](state) {
      // TODO
      console.log(state.sort);
    },


    /**
     * Reset state
     *
     * @param {object} state - Vuex state
     */
    [RESET_STATE](state) {
      const { allCache, favouriteCache } = state;

      state.all = [...allCache];
      state.favourite = [...favouriteCache];
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
     * Get the selected tag
     *
     * @param {object} state - The state of the module
     * @returns {string} - The tag selected
     */
    tag: (state) => state.tag,

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
     * Get the favourite voices
     *
     * @param {object} state - The state of the module
     * @returns {Array<object>} - The favourite voices
     */
    favourite: (state) => state.favourite,

    /**
     * Show favourite voices
     *
     * @param {object} state - The state of the module
     * @returns {boolean} - The validation flag
     */
    showFavourite: (state) => state.favourite.length > 0,
  },
};
