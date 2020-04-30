import Vue from 'vue';
import Vuetify from 'vuetify';
import '@testing-library/jest-dom';
import Voices from '@/components/Voices.vue';
import renderWithVuetify from '../helpers/renderWithVuetify';

Vue.use(Vuetify);

test('Must renders a list of voices', async () => {
  const props = {
    voices: [
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
  };

  const { getByText } = renderWithVuetify(Voices, { props });

  const zombie = getByText('Zombie');
  const android = getByText('Android');
  const cave = getByText('Cave');

  expect(zombie).toBeInTheDocument();
  expect(android).toBeInTheDocument();
  expect(cave).toBeInTheDocument();
});
