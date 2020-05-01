import constants from '@/utils/constants';
import initialState from '@/store/voices/initialState';

const { SORT, TAGS } = constants;

it('Voices store - initial state', () => {
  const expected = {
    all: [],
    cache: [],
    tag: TAGS.ALL,
    tags: [],
    search: null,
    searching: false,
    sort: SORT.ASC,
    playingId: null,
  };

  expect(initialState).toEqual(expected);
});
