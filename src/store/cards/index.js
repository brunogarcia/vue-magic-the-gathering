import initialState from '@/store/cards/initialState';
import actions from '@/store/cards/actions';
import mutations from '@/store/cards/mutations';
import getters from '@/store/cards/getters';


export default {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};
