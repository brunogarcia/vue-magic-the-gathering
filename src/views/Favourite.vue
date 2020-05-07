<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        xl="8"
        offset-xl="2"
      >
        <CardsTitle text="Favourite" />
        <Cards :cards="favourite" />
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
import Cards from '@/components/Cards.vue';
import CardsTitle from '@/components/CardsTitle.vue';

export default {
  name: 'Favourite',

  components: {
    Alert,
    Cards,
    CardsTitle,
  },

  computed: {
    ...mapGetters({
      tag: 'cards/tag',
      favourite: 'cards/favourite',
      searching: 'cards/searching',
    }),

    messageAlert() {
      return `No favourite card found on the ${this.tag} category`;
    },

    showAlert() {
      return this.searching && this.favourite.length === 0;
    },
  },
};
</script>
