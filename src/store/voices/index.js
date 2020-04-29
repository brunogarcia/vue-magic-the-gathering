import initialState from '@/store/voices/initialState';
import actions from '@/store/voices/actions';
import mutations from '@/store/voices/mutations';
import getters from '@/store/voices/getters';


export default {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};
