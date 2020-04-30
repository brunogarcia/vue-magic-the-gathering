<template>
  <v-app>
    <AppBar />
    <v-content>
      <Loading v-if="loading" />
      <div v-else>
        <FavouriteVoices v-if="showFavourite" />
        <ProVoices />
      </div>
    </v-content>
    <Snackbar
      v-if="error"
      :message="errorMessage"
    />
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AppBar from '@/views/AppBar.vue';
import ProVoices from '@/views/ProVoices.vue';
import Loading from '@/components/Loading.vue';
import Snackbar from '@/components/Snackbar.vue';
import FavouriteVoices from '@/views/FavouriteVoices.vue';

export default {
  name: 'App',

  components: {
    AppBar,
    Loading,
    Snackbar,
    ProVoices,
    FavouriteVoices,
  },

  data: () => ({
    loading: true,
    error: false,
    errorMessage: 'Sorry, there was a problem. Try again in a few minutes',
  }),

  created() {
    this.loadData();
  },

  computed: {
    ...mapGetters({
      showFavourite: 'voices/showFavourite',
    }),
  },

  methods: {
    ...mapActions({
      getVoices: 'voices/getVoices',
    }),

    async loadData() {
      try {
        await this.getVoices();
      } catch (error) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
