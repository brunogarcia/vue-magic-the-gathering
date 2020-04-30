<template>
  <div
    role="button"
    class="vm-voice-favourite"
    @click.stop="onClickVoiceFavourite"
  >
    <VoiceFavouriteOn
      v-if="isFavouriteAndHasMouseOver"
      role="img"
      aria-label="Voice Favourite Active"
    />

    <VoiceFavouriteOff
      v-if="isNotFavouriteAndHasMouseOver"
      role="img"
      aria-label="Voice Favourite Inactive"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import PropTypes from '@znck/prop-types';
import types from '@/utils/types';
import VoiceFavouriteOn from '@/assets/voice-favourite.svg';
import VoiceFavouriteOff from '@/assets/voice-favourite-off.svg';

export default {
  name: 'VoiceFavourite',

  props: {
    voice: types.voice,
    mouseOver: PropTypes.bool,
  },

  components: {
    VoiceFavouriteOn,
    VoiceFavouriteOff,
  },

  computed: {
    isFavouriteAndHasMouseOver() {
      return this.voice.favourite && this.mouseOver;
    },

    isNotFavouriteAndHasMouseOver() {
      return !this.voice.favourite && this.mouseOver;
    },
  },

  methods: {
    ...mapActions({
      toggleFavouriteVoice: 'voices/toggleFavouriteVoice',
    }),

    onClickVoiceFavourite() {
      this.toggleFavouriteVoice(this.voice.id);
    },
  },
};
</script>

<style lang="scss">
  .vm-voice-favourite {
    position: absolute;
    top: 0.6em;
    right: 0;
    padding: 0 4px;
    border-radius: 100%;
    background-color: #ffffff;
  }
</style>
