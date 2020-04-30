import Vue from 'vue';
import Vuetify from 'vuetify';
import '@testing-library/jest-dom';
import Loading from '@/components/Loading.vue';
import renderWithVuetify from '../helpers/renderWithVuetify';

Vue.use(Vuetify);

test('Loading component', async () => {
  const { getByRole } = renderWithVuetify(Loading);

  const component = getByRole('progressbar');

  expect(component).toBeInTheDocument();
});
