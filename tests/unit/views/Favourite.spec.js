import Vue from 'vue';
import Vuetify from 'vuetify';
import '@testing-library/jest-dom';
import Favourite from '@/views/Favourite.vue';
import renderWithVuetify from '../helpers/renderWithVuetify';

Vue.use(Vuetify);

test('Must renders the title of the section', async () => {
  const store = {
    modules: {
      cards: {
        namespaced: true,
        getters: {
          tag: () => null,
          searching: () => false,
          favourite: () => [
            {
              id: 'zombie',
              playing: false,
              favourite: false,
              name: 'Zombie',
              imageUrl: 'image01.png',
              tags: ['horror'],
            },
            {
              id: 'android',
              playing: false,
              favourite: false,
              name: 'Android',
              imageUrl: 'image02.png',
              tags: ['tech'],
            },
            {
              id: 'cave',
              playing: false,
              favourite: false,
              name: 'Cave',
              imageUrl: 'image03.png',
              tags: ['horror'],
            },
          ],
        },
      },
    },
  };

  const { getByText } = renderWithVuetify(Favourite, { store });

  const title = getByText('Favourite');

  expect(title).toBeInTheDocument();
});

test('If the list of cards is not empty must renders the list of cards', async () => {
  const store = {
    modules: {
      cards: {
        namespaced: true,
        getters: {
          tag: () => null,
          searching: () => false,
          favourite: () => [
            {
              id: 'zombie',
              playing: false,
              favourite: false,
              name: 'Zombie',
              imageUrl: 'image01.png',
              tags: ['horror'],
            },
            {
              id: 'android',
              playing: false,
              favourite: false,
              name: 'Android',
              imageUrl: 'image02.png',
              tags: ['tech'],
            },
            {
              id: 'cave',
              playing: false,
              favourite: false,
              name: 'Cave',
              imageUrl: 'image03.png',
              tags: ['horror'],
            },
          ],
        },
      },
    },
  };

  const { getByText } = renderWithVuetify(Favourite, { store });

  const zombie = getByText('Zombie');
  const android = getByText('Android');
  const cave = getByText('Cave');

  expect(zombie).toBeInTheDocument();
  expect(android).toBeInTheDocument();
  expect(cave).toBeInTheDocument();
});

test('If the list of cards is empty and the searching is active must show an alert message', async () => {
  const store = {
    modules: {
      cards: {
        namespaced: true,
        getters: {
          tag: () => 'Horror',
          searching: () => true,
          favourite: () => [],
        },
      },
    },
  };

  const { getByText } = renderWithVuetify(Favourite, { store });

  const alertMessage = getByText('No favourite card found on the Horror category');

  expect(alertMessage).toBeInTheDocument();
});
