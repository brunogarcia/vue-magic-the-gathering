<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <v-container>
      <v-row class="mt-5">
        <v-col
          cols="12"
          xl="2"
          offset-xl="2"
        >
          <Search />
        </v-col>
        <v-col
          cols="12"
          xl="2"
        >
          <TagFilter />
        </v-col>
      </v-row>
  </v-container>
  </v-app-bar>
</template>

<script>
import Search from '@/components/Search.vue';
import TagFilter from '@/components/TagFilter.vue';

export default {
  name: 'AppBar',

  components: {
    Search,
    TagFilter,
  },
};
</script>
