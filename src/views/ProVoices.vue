<template>
  <v-container>
    <VoicesTitle text="Pro Voices" />
    <Voices :voices="voices()" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Voices from '@/components/Voices.vue';
import VoicesTitle from '@/components/VoicesTitle.vue';

export default {
  name: 'ProVoices',

  components: {
    Voices,
    VoicesTitle,
  },

  methods: {
    ...mapGetters({
      voices: 'voices/voices',
    }),
  },
};
</script>
