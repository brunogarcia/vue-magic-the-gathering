<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        xl="8"
        offset-xl="2"
      >
        <VoicesTitle text="Pro Voices" />
        <Voices :voices="all" />
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
  name: 'ProVoices',

  components: {
    Alert,
    Voices,
    VoicesTitle,
  },

  computed: {
    ...mapGetters({
      tag: 'voices/tag',
      all: 'voices/all',
      searching: 'voices/searching',
    }),

    messageAlert() {
      return `No pro voice found on the ${this.tag} category`;
    },

    showAlert() {
      return this.searching && this.all.length === 0;
    },
  },
};
</script>
