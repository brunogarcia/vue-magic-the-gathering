import constants from '@/utils/constants';

const { SORT, TAGS } = constants;

export default {
  sort: SORT.ASC,
  tag: TAGS.ALL,
  tags: [],
  search: null,
  searching: false,
  all: [],
  allCache: [],
  favourite: [],
  favouriteCache: [],
};
