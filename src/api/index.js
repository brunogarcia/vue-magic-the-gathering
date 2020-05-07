import axios from 'axios';
import constants from '@/utils/constants';

const { API } = constants;

/**
 * Fecth cards
 *
 * @async
 * @returns {Array<object>} - The cards list
 */
async function fecthCards() {
  const { data } = await axios.get(`${API.HOST}/cards`);
  return data.cards;
}

export default {
  fecthCards,
};
