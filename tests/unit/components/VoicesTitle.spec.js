import Vue from 'vue';
import Vuetify from 'vuetify';
import '@testing-library/jest-dom';
import VoicesTitle from '@/components/VoicesTitle.vue';
import renderWithVuetify from '../helpers/renderWithVuetify';

Vue.use(Vuetify);

test('VoicesTitle component', async () => {
  const text = 'This a test message';

  const { getByText } = renderWithVuetify(VoicesTitle, {
    props: {
      text,
    },
  });

  const component = getByText(text);

  expect(component).toBeInTheDocument();
});
