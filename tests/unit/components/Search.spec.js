import Vue from 'vue';
import Vuetify from 'vuetify';
import '@testing-library/jest-dom';
import Search from '@/components/Search.vue';
import { fireEvent } from '@testing-library/vue';
import renderWithVuetify from '../helpers/renderWithVuetify';

Vue.use(Vuetify);

test('On change the input value, save the value on the store and filter the cards', async () => {
  const saveSearchMock = jest.fn();
  const filterCardsByNameMock = jest.fn();

  const store = {
    modules: {
      cards: {
        namespaced: true,
        actions: {
          saveSearch: saveSearchMock,
          filterCardsByName: filterCardsByNameMock,
        },
      },
    },
  };

  const { getByPlaceholderText } = renderWithVuetify(Search, { store });

  const input = getByPlaceholderText('Type something');

  fireEvent.input(input, { target: { value: 'Zombie' } });

  expect(saveSearchMock.mock.calls.length).toBe(1);
  expect(saveSearchMock.mock.calls[0][1]).toBe('Zombie');
  expect(filterCardsByNameMock.mock.calls.length).toBe(1);
});
