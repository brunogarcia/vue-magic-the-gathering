import Vue from 'vue';
import Vuetify from 'vuetify';
import '@testing-library/jest-dom';
import CardsTitle from '@/components/CardsTitle.vue';
import renderWithVuetify from '../helpers/renderWithVuetify';

Vue.use(Vuetify);

test('CardsTitle component', async () => {
  const text = 'This a test message';

  const { getByText } = renderWithVuetify(CardsTitle, {
    props: {
      text,
    },
  });

  const component = getByText(text);

  expect(component).toBeInTheDocument();
});
