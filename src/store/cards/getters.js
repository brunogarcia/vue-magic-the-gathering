export default {
  /**
   * Get playing id
   *
   * @param {object} state - The state of the module
   * @returns {string} - The card playing id
   */
  playingId: (state) => state.playingId,

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
   * Get all the cards
   *
   * @param {object} state - The state of the module
   * @returns {Array<object>} - The cards stored
   */
  all: (state) => state.all,

  /**
   * Get the favourite cards
   *
   * @param {object} state - The state of the module
   * @returns {Array<object>} - The favourite cards
   */
  favourite: (state) => state.all.filter((item) => item.favourite),
};
