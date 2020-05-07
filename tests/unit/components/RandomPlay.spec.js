import Vue from 'vue';
import Vuetify from 'vuetify';
import '@testing-library/jest-dom';
import RandomPlay from '@/components/RandomPlay.vue';
import { fireEvent } from '@testing-library/vue';
import renderWithVuetify from '../helpers/renderWithVuetify';

Vue.use(Vuetify);

test('If there is a card playing, stop it before play the random one', async () => {
  const togglePlayCardMock = jest.fn();
  const playRandomCardMock = jest.fn();

  const store = {
    modules: {
      cards: {
        namespaced: true,
        getters: {
          playingId: () => 123,
        },
        actions: {
          togglePlayCard: togglePlayCardMock,
          playRandomCard: playRandomCardMock,
        },
      },
    },
  };

  const { getByRole } = renderWithVuetify(RandomPlay, { store });

  const component = getByRole('button');

  fireEvent.click(component);

  expect(component).toBeInTheDocument();
  expect(togglePlayCardMock.mock.calls.length).toBe(1);
  expect(playRandomCardMock.mock.calls.length).toBe(1);
});

test('If there is not a card playing, play the random one', async () => {
  const togglePlayCardMock = jest.fn();
  const playRandomCardMock = jest.fn();

  const store = {
    modules: {
      cards: {
        namespaced: true,
        getters: {
          playingId: () => null,
        },
        actions: {
          togglePlayCard: togglePlayCardMock,
          playRandomCard: playRandomCardMock,
        },
      },
    },
  };

  const { getByRole } = renderWithVuetify(RandomPlay, { store });

  const component = getByRole('button');

  fireEvent.click(component);

  expect(component).toBeInTheDocument();
  expect(togglePlayCardMock.mock.calls.length).toBe(0);
  expect(playRandomCardMock.mock.calls.length).toBe(1);
});
