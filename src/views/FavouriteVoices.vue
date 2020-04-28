<template>
  <v-container v-if="show">
    <VoicesTitle text="Favourite Voices" />
    <Voices :voices="voices()" />
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
