<template>
  <div class="text-right">
    <RandomIcon
      class="vm-random-play"
      @click="onRandomPlayVoice"
    />
  </div>
</template>

<script>
import isNil from 'lodash.isnil';
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
      playingId: 'voices/playingId',
    }),
  },

  methods: {
    ...mapActions({
      playRandomVoice: 'voices/playRandomVoice',
      togglePlayVoice: 'voices/togglePlayVoice',
    }),

    onRandomPlayVoice() {
      // If there is a voice playing, stop it before play the random one
      if (!isNil(this.playingId)) {
        this.togglePlayVoice();
      }

      // Play the random one
      this.playRandomVoice();
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
