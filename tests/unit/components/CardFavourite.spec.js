import Vue from 'vue';
import Vuetify from 'vuetify';
import '@testing-library/jest-dom';
import CardFavourite from '@/components/CardFavourite.vue';
import { fireEvent } from '@testing-library/vue';
import renderWithVuetify from '../helpers/renderWithVuetify';

Vue.use(Vuetify);

test('On click on the button, toggle the card as favorite', async () => {
  const toggleFavouriteCardMock = jest.fn();

  const props = {
    mouseOver: false,
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
          toggleFavouriteCard: toggleFavouriteCardMock,
        },
      },
    },
  };

  const { getByRole } = renderWithVuetify(CardFavourite, { store, props });

  const favourite = getByRole('button');

  await fireEvent.click(favourite);

  expect(toggleFavouriteCardMock.mock.calls.length).toBe(1);
  expect(toggleFavouriteCardMock.mock.calls[0][1]).toBe('zombie');
});
