<template>
  <v-container v-if="show">
    <v-row>
      <v-col
        cols="12"
        xl="8"
        offset-xl="2"
      >
        <VoicesTitle text="Favourite Voices" />
        <Voices :voices="voices()" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Voices from '@/components/Voices.vue';
import VoicesTitle from '@/components/VoicesTitle.vue';

export default {
  name: 'FavouriteVoices',

  components: {
    Voices,
    VoicesTitle,
  },

  computed: {
    show() {
      return this.voices().length > 0;
    },
  },

  methods: {
    ...mapGetters({
      voices: 'voices/favouriteVoices',
    }),
  },
};
</script>
