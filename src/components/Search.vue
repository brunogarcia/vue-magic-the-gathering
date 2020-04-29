<template>
  <v-text-field
    v-model="value"
    solo
    dense
    clearable
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
      filterVoicesByName: 'voices/filterVoicesByName',
    }),

    onChangeValue() {
      this.filterVoicesByName(this.value);
    },
  },
};
</script>
