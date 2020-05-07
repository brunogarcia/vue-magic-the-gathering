import Vue from 'vue';
import Vuetify from 'vuetify';
import '@testing-library/jest-dom';
import Cards from '@/components/Cards.vue';
import renderWithVuetify from '../helpers/renderWithVuetify';

Vue.use(Vuetify);

test('Must renders a list of cards', async () => {
  const props = {
    cards: [
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
  };

  const { getByText } = renderWithVuetify(Cards, { props });

  const zombie = getByText('Zombie');
  const android = getByText('Android');
  const cave = getByText('Cave');

  expect(zombie).toBeInTheDocument();
  expect(android).toBeInTheDocument();
  expect(cave).toBeInTheDocument();
});
