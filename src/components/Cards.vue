<template>
  <v-row class="text-center">
    <v-col
      v-for="card in cards"
      :key="card.id"
      cols="6"
      sm="4"
      lg="3"
    >
      <Card :card="card" />
    </v-col>
  </v-row>
</template>

<script>
import types from '@/utils/types';
import Card from '@/components/Card.vue';

export default {
  name: 'Cards',

  components: {
    Card,
  },

  props: {
    cards: types.cards,
  },
};
</script>
