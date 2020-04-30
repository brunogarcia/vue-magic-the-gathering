import Vue from 'vue';
import Vuetify from 'vuetify';
import '@testing-library/jest-dom';
import Voice from '@/components/Voice.vue';
import { fireEvent } from '@testing-library/vue';
import renderWithVuetify from '../helpers/renderWithVuetify';

Vue.use(Vuetify);

test('On click on the voice, store the id and play/pause the voice', async () => {
  const savePlayingVoiceMock = jest.fn();
  const togglePlayVoiceMock = jest.fn();

  const props = {
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
          savePlayingVoice: savePlayingVoiceMock,
          togglePlayVoice: togglePlayVoiceMock,
        },
      },
    },
  };

  const { getByRole } = renderWithVuetify(Voice, { store, props });

  const voice = getByRole('button');

  await fireEvent.click(voice);

  expect(savePlayingVoiceMock.mock.calls.length).toBe(1);
  expect(savePlayingVoiceMock.mock.calls[0][1]).toBe('zombie');
  expect(togglePlayVoiceMock.mock.calls.length).toBe(1);
});
