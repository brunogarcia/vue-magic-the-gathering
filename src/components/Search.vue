<template>
  <v-text-field
    v-model="value"
    solo
    dense
    clearable
    placeholder="Type something"
    @input="onChangeValue"
  >
    <template v-slot:prepend-inner>
      <SearchIcon
        role="img"
        aria-label="Search icon"
      />
    </template>
  </v-text-field>
</template>

<script>
import { mapActions } from 'vuex';
import SearchIcon from '@/assets/search.svg';

export default {
  name: 'Search',

  components: {
    SearchIcon,
  },

  data: () => ({
    value: '',
  }),

  methods: {
    ...mapActions({
      saveSearch: 'cards/saveSearch',
      filterCardsByName: 'cards/filterCardsByName',
    }),

    onChangeValue() {
      this.saveSearch(this.value);
      this.filterCardsByName();
    },
  },
};
</script>
