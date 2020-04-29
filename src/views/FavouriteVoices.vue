<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        xl="8"
        offset-xl="2"
      >
        <VoicesTitle text="Favourite Voices" />
        <Voices :voices="favourite" />
        <Alert
          v-if="showAlert"
          :message="messageAlert"
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
      tag: 'voices/tag',
      favourite: 'voices/favourite',
      searching: 'voices/searching',
    }),

    messageAlert() {
      return `No favourite voice found on the ${this.tag} tag`;
    },

    showAlert() {
      return this.searching && this.favourite.length === 0;
    },
  },
};
</script>
