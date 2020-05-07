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
    @input="onSelectItem"
  >
    <template v-slot:prepend>
      <FilterIcon
        class="d-none d-sm-block"
        role="img"
        aria-label="Filter icon"
      />
    </template>

    <template v-slot:append>
      <SelectArrowIcon
        class="d-none d-sm-block"
        role="img"
        aria-label="Select arrow icon"
      />
    </template>

    <template v-slot:item="{ item }">
      <span class="text-capitalize">{{ item }}</span>
    </template>

    <template v-slot:selection="{ item }">
      <span
        class="d-none d-sm-block text-capitalize">
        {{ item }}
      </span>

      <FilterIcon
        role="img"
        class="d-block d-sm-none"
        aria-label="Filter icon"
      />
    </template>
  </v-select>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import constants from '@/utils/constants';
import FilterIcon from '@/assets/filter.svg';
import SelectArrowIcon from '@/assets/select-arrow.svg';

const { TAGS } = constants;

export default {
  name: 'TagFilter',

  data: () => ({
    tag: TAGS.ALL,
  }),

  components: {
    FilterIcon,
    SelectArrowIcon,
  },

  computed: {
    ...mapGetters({
      tags: 'cards/tags',
    }),
  },

  methods: {
    ...mapActions({
      saveTag: 'cards/saveTag',
      filterCardsByTag: 'cards/filterCardsByTag',
    }),

    onSelectItem() {
      this.saveTag(this.tag);
      this.filterCardsByTag();
    },
  },
};
</script>
