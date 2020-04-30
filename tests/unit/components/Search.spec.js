import Vue from 'vue';
import Vuetify from 'vuetify';
import '@testing-library/jest-dom';
import Search from '@/components/Search.vue';
import { fireEvent } from '@testing-library/vue';
import renderWithVuetify from '../helpers/renderWithVuetify';

Vue.use(Vuetify);

test('On change the input value, save the value on the store and filter the voices', async () => {
  const saveSearchMock = jest.fn();
  const filterVoicesByNameMock = jest.fn();

  const store = {
    modules: {
      voices: {
        namespaced: true,
        actions: {
          saveSearch: saveSearchMock,
          filterVoicesByName: filterVoicesByNameMock,
        },
      },
    },
  };

  const { getByPlaceholderText } = renderWithVuetify(Search, { store });

  const input = getByPlaceholderText('Type something');

  fireEvent.input(input, { target: { value: 'Zombie' } });

  expect(saveSearchMock.mock.calls.length).toBe(1);
  expect(saveSearchMock.mock.calls[0][1]).toBe('Zombie');
  expect(filterVoicesByNameMock.mock.calls.length).toBe(1);
});
