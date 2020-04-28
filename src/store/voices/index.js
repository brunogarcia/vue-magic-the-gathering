import api from '@/api';
import types from './utils/types';
import mapVoices from './utils/mapVoices';

const {
  SAVE_VOICES,
  SAVE_FAVOURITE_VOICE,
} = types;

export default {
  namespaced: true,
  state: {
    voices: [],
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
  },
  mutations: {
    /**
     * Save voices
     *
     * @param {object} state - Vuex state
     * @param {object} payload - The voices to store
     */
    [SAVE_VOICES](state, payload) {
      state.voices = payload;
    },

    /**
     * Save favourite voice
     *
     * @param {object} state - Vuex state
     * @param {string} id - The voice id to update
     */
    [SAVE_FAVOURITE_VOICE](state, id) {
      const { voices } = state;
      const voiceIndex = voices.findIndex((voice) => voice.id === id);

      voices[voiceIndex].favourite = !voices[voiceIndex].favourite;

      state.voices = voices;
    },
  },
  getters: {
    /**
     * Get all the voices
     *
     * @param {object} state - The state of the module
     * @returns {Array<object>} - The voices stored
     */
    voices: (state) => state.voices,

    /**
     * Get only the favourite voices
     *
     * @param {object} state - The state of the module
     * @returns {Array<object>} - The Favourite voices stored
     */
    favouriteVoices: (state) => state.voices.filter((voice) => voice.favourite),
  },
};
