import Vue from 'vue';
import Vuetify from 'vuetify';
import '@testing-library/jest-dom';
import Alert from '@/components/Alert.vue';
import renderWithVuetify from '../helpers/renderWithVuetify';

Vue.use(Vuetify);

test('Alert component', async () => {
  const message = 'This a test message';

  const { getByText } = renderWithVuetify(Alert, {
    props: {
      message,
    },
  });

  const component = getByText(message);

  expect(component).toBeInTheDocument();
});
