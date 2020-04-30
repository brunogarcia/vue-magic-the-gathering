import Vue from 'vue';
import Vuetify from 'vuetify';
import '@testing-library/jest-dom';
import VoiceFavourite from '@/components/VoiceFavourite.vue';
import { fireEvent } from '@testing-library/vue';
import renderWithVuetify from '../helpers/renderWithVuetify';

Vue.use(Vuetify);

test('On click on the button, toggle the voice as favorite', async () => {
  const toggleFavouriteVoiceMock = jest.fn();

  const props = {
    mouseOver: false,
    voice: {
      id: 'zombie',
      playing: false,
      favourite: false,
      name: 'Zombie',
      icon: 'zombie-icon',
      tags: ['horror'],
    },
  };

  const store = {
    modules: {
      voices: {
        namespaced: true,
        actions: {
          toggleFavouriteVoice: toggleFavouriteVoiceMock,
        },
      },
    },
  };

  const { getByRole } = renderWithVuetify(VoiceFavourite, { store, props });

  const favourite = getByRole('button');

  await fireEvent.click(favourite);

  expect(toggleFavouriteVoiceMock.mock.calls.length).toBe(1);
  expect(toggleFavouriteVoiceMock.mock.calls[0][1]).toBe('zombie');
});
