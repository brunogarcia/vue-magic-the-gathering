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
      <SearchIcon />
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
      saveSearch: 'voices/saveSearch',
      filterVoicesByName: 'voices/filterVoicesByName',
    }),

    onChangeValue() {
      this.saveSearch(this.value);
      this.filterVoicesByName();
    },
  },
};
</script>
