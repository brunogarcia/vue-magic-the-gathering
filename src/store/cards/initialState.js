import constants from '@/utils/constants';

const { SORT, TAGS } = constants;

export default {
  all: [],
  cache: [],
  tag: TAGS.ALL,
  tags: [],
  search: null,
  searching: false,
  sort: SORT.ASC,
  playingId: null,
};
