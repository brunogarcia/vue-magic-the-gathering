import Vue from 'vue';
import Vuetify from 'vuetify';
import '@testing-library/jest-dom';
import RandomPlay from '@/components/RandomPlay.vue';
import { fireEvent } from '@testing-library/vue';
import renderWithVuetify from '../helpers/renderWithVuetify';

Vue.use(Vuetify);

test('Play the random card', async () => {
  const playRandomCardMock = jest.fn();

  const store = {
    modules: {
      cards: {
        namespaced: true,
        getters: {
          playingId: () => null,
        },
        actions: {
          playRandomCard: playRandomCardMock,
        },
      },
    },
  };

  const { getByRole } = renderWithVuetify(RandomPlay, { store });

  const component = getByRole('button');

  fireEvent.click(component);

  expect(component).toBeInTheDocument();
  expect(playRandomCardMock.mock.calls.length).toBe(1);
});
