import Vue from 'vue';
import Vuetify from 'vuetify';
import '@testing-library/jest-dom';
import SortFilter from '@/components/SortFilter.vue';
import { fireEvent } from '@testing-library/vue';
import renderWithVuetify from '../helpers/renderWithVuetify';

Vue.use(Vuetify);

test('On select a item, save the value on the store and sort the voices', async () => {
  const saveSortMock = jest.fn();
  const sortVoicesMock = jest.fn();

  const store = {
    modules: {
      voices: {
        namespaced: true,
        actions: {
          saveSort: saveSortMock,
          sortVoices: sortVoicesMock,
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
  expect(sortVoicesMock.mock.calls.length).toBe(1);
});
