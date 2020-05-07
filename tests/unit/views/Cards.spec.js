import Vue from 'vue';
import Vuetify from 'vuetify';
import '@testing-library/jest-dom';
import Cards from '@/views/Cards.vue';
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
          all: () => [
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

  const { getByText } = renderWithVuetify(Cards, { store });

  const title = getByText('Cards');

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
          all: () => [
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

  const { getByText } = renderWithVuetify(Cards, { store });

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
          all: () => [],
        },
      },
    },
  };

  const { getByText } = renderWithVuetify(Cards, { store });

  const alertMessage = getByText('No card found on the Horror category');

  expect(alertMessage).toBeInTheDocument();
});
