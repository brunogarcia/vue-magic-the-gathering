<template>
  <v-overlay
    :value="overlay"
  >
  <v-card
    light
    class="mx-auto"
    max-width="344"
  >
    <v-img
      :src="card.imageUrl"
    ></v-img>

    <v-card-title>
      {{ card.name }}
    </v-card-title>

    <v-card-subtitle>
      {{ card.text }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        text
        @click="onCloseCard"
      >Close</v-btn>
    </v-card-actions>
  </v-card>
  </v-overlay>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PlayCard',

  data: () => ({
    overlay: true,
  }),

  computed: {
    ...mapGetters({
      card: 'cards/playingCard',
    }),
  },

  methods: {
    ...mapActions({
      playCard: 'cards/playCard',
    }),

    onCloseCard() {
      this.overlay = false;
      this.playCard(null);
    },
  },
};
</script>
