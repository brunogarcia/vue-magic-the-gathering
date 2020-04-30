import Vue from 'vue';
import Vuetify from 'vuetify';
import '@testing-library/jest-dom';
import TagFilter from '@/components/TagFilter.vue';
import { fireEvent } from '@testing-library/vue';
import renderWithVuetify from '../helpers/renderWithVuetify';

Vue.use(Vuetify);

test('On select a item, save the value on the store and filter the voices', async () => {
  const saveTagMock = jest.fn();
  const filterVoicesByTagMock = jest.fn();

  const store = {
    modules: {
      voices: {
        namespaced: true,
        getters: {
          tags: () => ['horror', 'robotic', 'sing'],
        },
        actions: {
          saveTag: saveTagMock,
          filterVoicesByTag: filterVoicesByTagMock,
        },
      },
    },
  };

  const { getByRole, queryByText } = renderWithVuetify(TagFilter, { store });

  const selector = getByRole('button');

  await fireEvent.click(selector);

  const menuItem = queryByText('horror');

  await fireEvent.click(menuItem);

  expect(saveTagMock.mock.calls.length).toBe(1);
  expect(saveTagMock.mock.calls[0][1]).toBe('horror');
  expect(filterVoicesByTagMock.mock.calls.length).toBe(1);
});
