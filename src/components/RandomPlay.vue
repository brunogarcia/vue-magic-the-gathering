<template>
  <div
    role="button"
    tabindex="0"
    class="text-right"
    title="Choose a random card"
    @click="onRandomPlayCard"
  >
    <RandomIcon
      role="img"
      aria-label="Random icon"
      class="vm-random-play"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import RandomIcon from '@/assets/button-random.svg';

export default {
  name: 'RandomPlay',

  components: {
    RandomIcon,
  },

  data: () => ({
    active: false,
  }),

  computed: {
    ...mapGetters({
      playingId: 'cards/playingId',
    }),
  },

  methods: {
    ...mapActions({
      playRandomCard: 'cards/playRandomCard',
    }),

    onRandomPlayCard() {
      this.playRandomCard();
    },
  },
};
</script>

<style lang="scss">
  .vm-random-play {
    cursor: pointer;

    &:hover {
      animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      perspective: 1000px;
      filter: invert(0.5) sepia(1) saturate(5) hue-rotate(175deg);
    }

    @keyframes shake {
      10%, 90% {
        transform: translate3d(-1px, 0, 0);
      }

      20%, 80% {
        transform: translate3d(2px, 0, 0);
      }

      30%, 50%, 70% {
        transform: translate3d(-4px, 0, 0);
      }

      40%, 60% {
        transform: translate3d(4px, 0, 0);
      }
    }
  }
</style>
