<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        xl="8"
        offset-xl="2"
      >
        <VoicesTitle text="Pro Voices" />
        <Voices :voices="getVoices()" />
        <Alert
          v-if="showAlert"
          message="No pro voice found"
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
      all: 'voices/all',
      searching: 'voices/searching',
      allFiltered: 'voices/allFiltered',
    }),

    showAlert() {
      return this.searching && this.allFiltered.length === 0;
    },
  },

  methods: {
    getVoices() {
      return this.searching
        ? this.allFiltered
        : this.all;
    },
  },
};
</script>
