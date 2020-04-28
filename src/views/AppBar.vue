<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <div class="d-flex align-center mt-5">
      <Search />
    </div>

    <v-spacer />
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
