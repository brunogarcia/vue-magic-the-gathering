<template>
  <v-container>
    <p>Pro Voices</p>
    <Voices :voices="voices()" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Voices from '@/components/Voices.vue';

export default {
  name: 'ProVoices',

  components: {
    Voices,
  },

  methods: {
    ...mapGetters({
      voices: 'voices/voices',
    }),
  },
};
</script>
