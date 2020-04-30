import Vue from 'vue';
import Vuetify from 'vuetify';
import '@testing-library/jest-dom';
import RandomPlay from '@/components/RandomPlay.vue';
import { render, fireEvent } from '@testing-library/vue';

Vue.use(Vuetify);

test('If there is a voice playing, stop it before play the random one', async () => {
  const togglePlayVoiceMock = jest.fn();
  const playRandomVoiceMock = jest.fn();

  const store = {
    modules: {
      voices: {
        namespaced: true,
        getters: {
          playingId: () => 123,
        },
        actions: {
          togglePlayVoice: togglePlayVoiceMock,
          playRandomVoice: playRandomVoiceMock,
        },
      },
    },
  };

  const { getByRole } = render(RandomPlay, { store });

  const component = getByRole('button');

  fireEvent.click(component);

  expect(component).toBeInTheDocument();
  expect(togglePlayVoiceMock.mock.calls.length).toBe(1);
  expect(playRandomVoiceMock.mock.calls.length).toBe(1);
});

test('If there is not a voice playing, play the random one', async () => {
  const togglePlayVoiceMock = jest.fn();
  const playRandomVoiceMock = jest.fn();

  const store = {
    modules: {
      voices: {
        namespaced: true,
        getters: {
          playingId: () => null,
        },
        actions: {
          togglePlayVoice: togglePlayVoiceMock,
          playRandomVoice: playRandomVoiceMock,
        },
      },
    },
  };

  const { getByRole } = render(RandomPlay, { store });

  const component = getByRole('button');

  fireEvent.click(component);

  expect(component).toBeInTheDocument();
  expect(togglePlayVoiceMock.mock.calls.length).toBe(0);
  expect(playRandomVoiceMock.mock.calls.length).toBe(1);
});
