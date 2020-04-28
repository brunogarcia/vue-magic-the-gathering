<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <v-container>
      <v-row>
        <v-col
          cols="12"
          xl="2"
          offset-xl="2"
        >
          <div class="mt-5">
            <Search />
          </div>
        </v-col>
      </v-row>
  </v-container>
  </v-app-bar>
</template>

<script>
import Search from '@/components/Search.vue';

export default {
  name: 'AppBar',

  components: {
    Search,
  },
};
</script>
