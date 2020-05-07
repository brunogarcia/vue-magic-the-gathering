import Vue from 'vue';
import Vuetify from 'vuetify';
import '@testing-library/jest-dom';
import Card from '@/components/Card.vue';
import { fireEvent } from '@testing-library/vue';
import renderWithVuetify from '../helpers/renderWithVuetify';

Vue.use(Vuetify);

test('On click on the button, store the id and play/pause the card', async () => {
  const savePlayingCardMock = jest.fn();
  const togglePlayCardMock = jest.fn();

  const props = {
    card: {
      id: 'zombie',
      playing: false,
      favourite: false,
      name: 'Zombie',
      imageUrl: 'image01.png',
      tags: ['horror'],
    },
  };

  const store = {
    modules: {
      cards: {
        namespaced: true,
        actions: {
          savePlayingCard: savePlayingCardMock,
          togglePlayCard: togglePlayCardMock,
        },
      },
    },
  };

  const { getByRole } = renderWithVuetify(Card, { store, props, stubs: ['CardFavourite'] });

  const card = getByRole('button');

  await fireEvent.click(card);

  expect(savePlayingCardMock.mock.calls.length).toBe(1);
  expect(savePlayingCardMock.mock.calls[0][1]).toBe('zombie');
  expect(togglePlayCardMock.mock.calls.length).toBe(1);
});
