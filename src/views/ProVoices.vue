<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        xl="8"
        offset-xl="2"
      >
        <VoicesTitle text="Pro Voices" />
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
