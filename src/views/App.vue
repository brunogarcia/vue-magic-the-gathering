<template>
  <v-app>
    <AppBar />
    <v-content v-if="!loading">
      <FavouriteVoices />
      <ProVoices />
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import AppBar from '@/views/AppBar.vue';
import ProVoices from '@/views/ProVoices.vue';
import FavouriteVoices from '@/views/FavouriteVoices.vue';

export default {
  name: 'App',

  components: {
    AppBar,
    ProVoices,
    FavouriteVoices,
  },

  data: () => ({
    loading: true,
  }),

  created() {
    this.loadData();
  },

  methods: {
    ...mapActions({
      getVoices: 'voices/getVoices',
    }),

    async loadData() {
      try {
        await this.getVoices();
      } catch (error) {
        // TODO: show snackbar
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
