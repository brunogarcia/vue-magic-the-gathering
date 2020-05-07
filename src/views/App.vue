<template>
  <v-app>
    <AppBar />
    <v-content>
      <Loading v-if="loading" />
      <div v-else>
        <Favourite v-if="showFavourite" />
        <Cards />
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
import Cards from '@/views/Cards.vue';
import Loading from '@/components/Loading.vue';
import Snackbar from '@/components/Snackbar.vue';
import Favourite from '@/views/Favourite.vue';

export default {
  name: 'App',

  components: {
    AppBar,
    Loading,
    Snackbar,
    Cards,
    Favourite,
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
      favourite: 'cards/favourite',
    }),

    showFavourite() {
      return this.favourite.length > 0;
    },
  },

  methods: {
    ...mapActions({
      getCards: 'cards/getCards',
    }),

    async loadData() {
      try {
        await this.getCards();
      } catch (error) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
