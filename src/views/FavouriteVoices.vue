<template>
  <p>Favourite Voices</p>
</template>

<script>
import { mapGetters } from 'vuex';
// import Voices from '@/components/Voices.vue';

export default {
  name: 'FavouriteVoices',

  // components: {
  //   Voices,
  // },

  methods: {
    ...mapGetters({
      voices: 'voices/voices',
    }),
  },
};
</script>
