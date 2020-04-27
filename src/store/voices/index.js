import api from '@/api';
import types from './types';

const { SAVE_VOICES } = types;

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
        commit(SAVE_VOICES, data);
        return true;
      } catch (error) {
        return error;
      }
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
  },
  getters: {
    /**
     * Voices
     *
     * @param {object} state - The state of the module
     * @returns {Array<object>} - The voices stored
     */
    voices: (state) => state.voices,
  },
};
