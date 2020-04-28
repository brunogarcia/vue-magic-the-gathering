<template>
  <v-container v-if="show">
    <p>Favourite Voices</p>
    <Voices :voices="voices()" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Voices from '@/components/Voices.vue';

export default {
  name: 'FavouriteVoices',

  components: {
    Voices,
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
