<template>
  <v-text-field
    solo
    dense
    clearable
    v-model="value"
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

  data: () => ({
    value: '',
  }),

  components: {
    SearchIcon,
  },

  methods: {
    ...mapActions({
      filterVoices: 'voices/filterVoices',
    }),

    onChangeValue() {
      this.filterVoices(this.value);
    },
  },
};
</script>
