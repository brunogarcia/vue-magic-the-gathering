<template>
  <v-app-bar
    app
    dark
    color="primary"
  >
    <v-container>
      <v-row>
        <v-col
          cols="12"
          xl="8"
          offset-xl="2"
        >
          <v-row class="mt-5">
            <v-col
              cols="4"
              xl="3"
            >
              <Search />
            </v-col>

            <v-spacer />

            <v-col
              cols="3"
              xl="2"
            >
              <TagFilter />
            </v-col>

            <v-col
              cols="3"
              xl="2"
            >
              <SortFilter />
            </v-col>

            <v-col
              cols="1"
            >
              <RandomPlay />
            </v-col>
          </v-row>
      </v-col>
    </v-row>
  </v-container>
  </v-app-bar>
</template>

<script>
import Search from '@/components/Search.vue';
import TagFilter from '@/components/TagFilter.vue';
import SortFilter from '@/components/SortFilter.vue';
import RandomPlay from '@/components/RandomPlay.vue';

export default {
  name: 'AppBar',

  components: {
    Search,
    TagFilter,
    SortFilter,
    RandomPlay,
  },
};
</script>
