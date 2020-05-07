<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        xl="8"
        offset-xl="2"
      >
        <CardsTitle text="Cards" />
        <CardsComponent :cards="all" />
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
import CardsComponent from '@/components/Cards.vue';
import CardsTitle from '@/components/CardsTitle.vue';

export default {
  name: 'Cards',

  components: {
    Alert,
    CardsComponent,
    CardsTitle,
  },

  computed: {
    ...mapGetters({
      tag: 'cards/tag',
      all: 'cards/all',
      searching: 'cards/searching',
    }),

    messageAlert() {
      return `No card found on the ${this.tag} category`;
    },

    showAlert() {
      return this.searching && this.all.length === 0;
    },
  },
};
</script>
