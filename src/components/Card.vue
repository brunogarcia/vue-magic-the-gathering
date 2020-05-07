<template>
  <div
    role="button"
    class="vm-card"
    :class="{ 'vm-card__selected': card.playing }"
    @click="onClickCard"
    @mouseover="onMouseOverCard"
    @mouseleave="onMouseLeaveCard"
  >
    <div class="vm-card-image">
      <img
        :alt="card.name"
        :src="this.card.imageUrl"
      >

      <CardFavourite
        :card="card"
        :mouseOver="mouseOverCard"
      />
    </div>

    <p class="mt-2 body-2 black--text font-weight-medium">
      {{ card.name }}
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import types from '@/utils/types';
import CardFavourite from '@/components/CardFavourite.vue';

export default {
  name: 'Card',

  props: {
    card: types.card,
  },

  components: {
    CardFavourite,
  },

  data: () => ({
    mouseOverCard: false,
  }),

  methods: {
    ...mapActions({
      savePlayingCard: 'cards/savePlayingCard',
      togglePlayCard: 'cards/togglePlayCard',
    }),

    onClickCard() {
      this.savePlayingCard(this.card.id);
      this.togglePlayCard();
    },

    onMouseOverCard() {
      this.mouseOverCard = true;
    },

    onMouseLeaveCard() {
      this.mouseOverCard = false;
    },
  },
};
</script>

<style lang="scss">
  .vm-card {
    cursor: pointer;

    .vm-card-image {
      display: inline-block;
      position: relative;
    }
  }
</style>
