export default {
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
};
