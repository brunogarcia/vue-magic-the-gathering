import Vue from 'vue';
import Vuetify from 'vuetify';
import '@testing-library/jest-dom';
import SortFilter from '@/components/SortFilter.vue';
import { fireEvent } from '@testing-library/vue';
import renderWithVuetify from '../helpers/renderWithVuetify';

Vue.use(Vuetify);

test('On select a item, save the value on the store and sort the cards', async () => {
  const saveSortMock = jest.fn();
  const sortCardsMock = jest.fn();

  const store = {
    modules: {
      cards: {
        namespaced: true,
        actions: {
          saveSort: saveSortMock,
          sortCards: sortCardsMock,
        },
      },
    },
  };

  const { getByRole, queryByText } = renderWithVuetify(SortFilter, { store });

  const selector = getByRole('button');

  await fireEvent.click(selector);

  const menuItem = queryByText('desc');

  await fireEvent.click(menuItem);

  expect(saveSortMock.mock.calls.length).toBe(1);
  expect(saveSortMock.mock.calls[0][1]).toBe('desc');
  expect(sortCardsMock.mock.calls.length).toBe(1);
});
