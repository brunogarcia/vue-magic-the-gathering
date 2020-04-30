import Vue from 'vue';
import Vuetify from 'vuetify';
import '@testing-library/jest-dom';
import ProVoices from '@/views/ProVoices.vue';
import renderWithVuetify from '../helpers/renderWithVuetify';

Vue.use(Vuetify);

test('Must renders the title of the section', async () => {
  const store = {
    modules: {
      voices: {
        namespaced: true,
        getters: {
          tag: () => null,
          searching: () => false,
          all: () => [
            {
              id: 'zombie',
              playing: false,
              favourite: false,
              name: 'Zombie',
              icon: 'zombie-icon',
              tags: ['horror'],
            },
            {
              id: 'android',
              playing: false,
              favourite: false,
              name: 'Android',
              icon: 'android-icon',
              tags: ['tech'],
            },
            {
              id: 'cave',
              playing: false,
              favourite: false,
              name: 'Cave',
              icon: 'cave-icon',
              tags: ['horror'],
            },
          ],
        },
      },
    },
  };

  const { getByText } = renderWithVuetify(ProVoices, { store });

  const title = getByText('Pro Voices');

  expect(title).toBeInTheDocument();
});

test('If the list of voices is not empty must renders the list of voices', async () => {
  const store = {
    modules: {
      voices: {
        namespaced: true,
        getters: {
          tag: () => null,
          searching: () => false,
          all: () => [
            {
              id: 'zombie',
              playing: false,
              favourite: false,
              name: 'Zombie',
              icon: 'zombie-icon',
              tags: ['horror'],
            },
            {
              id: 'android',
              playing: false,
              favourite: false,
              name: 'Android',
              icon: 'android-icon',
              tags: ['tech'],
            },
            {
              id: 'cave',
              playing: false,
              favourite: false,
              name: 'Cave',
              icon: 'cave-icon',
              tags: ['horror'],
            },
          ],
        },
      },
    },
  };

  const { getByText } = renderWithVuetify(ProVoices, { store });

  const zombie = getByText('Zombie');
  const android = getByText('Android');
  const cave = getByText('Cave');

  expect(zombie).toBeInTheDocument();
  expect(android).toBeInTheDocument();
  expect(cave).toBeInTheDocument();
});

test('If the list of voices is empty and the searching is active must show an alert message', async () => {
  const store = {
    modules: {
      voices: {
        namespaced: true,
        getters: {
          tag: () => 'Horror',
          searching: () => true,
          all: () => [],
        },
      },
    },
  };

  const { getByText } = renderWithVuetify(ProVoices, { store });

  const alertMessage = getByText('No pro voice found on the Horror category');

  expect(alertMessage).toBeInTheDocument();
});
