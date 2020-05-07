<template>
  <v-app>
    <AppBar />
    <v-content>
      <Loading v-if="loading" />
      <div v-else>
        <Favourite v-if="showFavourite" />
        <Cards />
        <PlayCard v-if="showPlayCard" />
      </div>
    </v-content>
    <Snackbar
      v-if="error"
      :message="errorMessage"
    />
  </v-app>
</template>

<script>
import isNil from 'lodash.isnil';
import { mapActions, mapGetters } from 'vuex';
import AppBar from '@/views/AppBar.vue';
import Cards from '@/views/Cards.vue';
import PlayCard from '@/components/PlayCard.vue';
import Loading from '@/components/Loading.vue';
import Snackbar from '@/components/Snackbar.vue';
import Favourite from '@/views/Favourite.vue';

export default {
  name: 'App',

  components: {
    AppBar,
    Loading,
    Snackbar,
    PlayCard,
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
      playingId: 'cards/playingId',
    }),

    showFavourite() {
      return this.favourite.length > 0;
    },

    showPlayCard() {
      return !isNil(this.playingId);
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
