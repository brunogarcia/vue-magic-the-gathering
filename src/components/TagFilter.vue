<template>
  <v-select
    v-model="tag"
    :items="tags"
    solo
    dense
    single-line
    hide-details
    menu-props="auto"
    label="Filter by tag"
    @input="onSelectTag"
  >
    <template v-slot:prepend>
      <FilterIcon />
    </template>
    <template v-slot:item="{ item }">
      <span class="white--text text-capitalize">{{ item }}</span>
    </template>
        <template v-slot:selection="{ item }">
      <span class="white--text text-capitalize">{{ item }}</span>
    </template>
  </v-select>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import constants from '@/utils/constants';
import FilterIcon from '@/assets/filter.svg';

const { TAGS } = constants;

export default {
  name: 'TagFilter',

  data: () => ({
    tag: TAGS.ALL,
  }),

  components: {
    FilterIcon,
  },

  computed: {
    ...mapGetters({
      tags: 'voices/tags',
    }),
  },

  methods: {
    ...mapActions({
      filterVoicesByTag: 'voices/filterVoicesByTag',
    }),

    onSelectTag() {
      this.filterVoicesByTag(this.tag);
    },
  },
};
</script>
