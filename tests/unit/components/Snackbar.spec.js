import Vue from 'vue';
import Vuetify from 'vuetify';
import '@testing-library/jest-dom';
import Snackbar from '@/components/Snackbar.vue';
import renderWithVuetify from '../helpers/renderWithVuetify';

Vue.use(Vuetify);

test('Snackbar component', async () => {
  const { getByRole } = renderWithVuetify(Snackbar, {
    props: {
      message: 'This a test message',
    },
  });

  const component = getByRole('alert');

  expect(component).toBeInTheDocument();
});
