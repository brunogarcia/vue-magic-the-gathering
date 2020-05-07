<template>
  <div
    role="button"
    class="vm-card-favourite"
    @click.stop="onClickCardFavourite"
  >
    <FavouriteOn
      v-if="isFavouriteAndHasMouseOver"
      role="img"
      aria-label="Card Favourite Active"
    />

    <FavouriteOff
      v-if="isNotFavouriteAndHasMouseOver"
      role="img"
      aria-label="Card Favourite Inactive"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import PropTypes from '@znck/prop-types';
import types from '@/utils/types';
import FavouriteOn from '@/assets/favourite.svg';
import FavouriteOff from '@/assets/favourite-off.svg';

export default {
  name: 'CardFavourite',

  props: {
    card: types.card,
    mouseOver: PropTypes.bool,
  },

  components: {
    FavouriteOn,
    FavouriteOff,
  },

  computed: {
    isFavouriteAndHasMouseOver() {
      return this.card.favourite && this.mouseOver;
    },

    isNotFavouriteAndHasMouseOver() {
      return !this.card.favourite && this.mouseOver;
    },
  },

  methods: {
    ...mapActions({
      toggleFavouriteCard: 'cards/toggleFavouriteCard',
    }),

    onClickCardFavourite() {
      this.toggleFavouriteCard(this.card.id);
    },
  },
};
</script>

<style lang="scss">
  .vm-card-favourite {
    position: absolute;
    top: 0.6em;
    right: 0;
    padding: 0 6px;
    border-radius: 100%;
    background-color: #ffffff;
  }
</style>
