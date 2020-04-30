import types from '@/store/voices/utils/types';
import getRandomVoice from '@/store/voices/utils/getRandomVoice';
import getFilteredVoices from '@/store/voices/utils/getFilteredVoices';

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
   * Save voices
   *
   * @param {object} state - Module state
   * @param {object} voices - The voices to store
   */
  [SAVE_ALL_VOICES](state, voices) {
    state.all = voices;
    state.allCache = voices;
  },

  /**
   * Save random playing voice
   *
   * @param {object} state - Module state
   */
  [SAVE_RANDOM_PLAYING_VOICE](state) {
    const { id } = getRandomVoice([...state.all]);

    state.playingId = id;
  },

  /**
   * Save playing id voice
   *
   * @param {object} state - Module state
   * @param {string} id - The voice id
   */
  [SAVE_PLAYING_VOICE](state, id) {
    state.playingId = id;
  },

  /**
   * Toggle play voice
   *
   * @param {object} state - Module state
   */
  [TOGGLE_PLAY_VOICE](state) {
    const temp = [...state.all];

    // Find the index of the voice
    const voiceIndex = temp.findIndex((voice) => voice.id === state.playingId);

    // If the voice exists, update the voice
    if (voiceIndex !== -1) {
      temp[voiceIndex].playing = !temp[voiceIndex].playing;
      state.all = temp;
    }
  },

  /**
   * Toggle favourite voice
   *
   * @param {object} state - Module state
   * @param {string} id - The voice id
   */
  [TOGGLE_FAVOURITE_VOICE](state, id) {
    const temp = [...state.all];

    // Find the index of the voice
    const voiceIndex = temp.findIndex((voice) => voice.id === id);

    // If the voice exists, update the voice
    if (voiceIndex !== -1) {
      temp[voiceIndex].favourite = !temp[voiceIndex].favourite;
      state.all = temp;
    }
  },

  /**
   * Toggle search mode
   *
   * @param {object} state - Module state
   * @param {boolean} isValidValue - Flag for checking if the value is valid
   */
  [TOGGLE_SEARCH_MODE](state, isValidValue) {
    state.searching = isValidValue;
  },

  /**
   * Filter and sort the voices by tag and search value
   *
   * @param {object} state - Module state
   */
  [FILTER_VOICES](state) {
    const {
      tag,
      sort,
      search,
      allCache,
    } = state;

    const options = { search, tag, sortType: sort };
    const optionsAll = { ...options, voices: allCache };

    state.all = getFilteredVoices(optionsAll);
  },

  /**
   * Reset state
   *
   * @param {object} state - Module state
   */
  [RESET_STATE](state) {
    const { allCache } = state;
    state.all = [...allCache];
  },
};
