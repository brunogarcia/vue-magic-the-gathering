<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        xl="8"
        offset-xl="2"
      >
        <VoicesTitle text="Favourite Voices" />
        <Voices :voices="getVoices()" />
        <Alert
          v-if="showAlert"
          message="No favourite voice found"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Alert from '@/components/Alert.vue';
import Voices from '@/components/Voices.vue';
import VoicesTitle from '@/components/VoicesTitle.vue';

export default {
  name: 'FavouriteVoices',

  components: {
    Alert,
    Voices,
    VoicesTitle,
  },

  computed: {
    ...mapGetters({
      favourite: 'voices/favourite',
      searching: 'voices/searching',
      favouriteFiltered: 'voices/favouriteFiltered',
    }),

    showAlert() {
      return this.searching && this.favouriteFiltered.length === 0;
    },
  },

  methods: {
    getVoices() {
      return this.searching
        ? this.favouriteFiltered
        : this.favourite;
    },
  },
};
</script>
