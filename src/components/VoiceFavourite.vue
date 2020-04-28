<template>
  <div class="vm-voice__favourite">
    <VoiceFavouriteOn v-if="!favourite && mouseOver" />
    <VoiceFavouriteOff v-if="favourite && mouseOver" />
  </div>
</template>

<script>
import PropTypes from '@znck/prop-types';
import VoiceFavouriteOn from '@/assets/voice-favourite.svg';
import VoiceFavouriteOff from '@/assets/voice-favourite-off.svg';

export default {
  name: 'VoiceFavourite',

  props: {
    favourite: PropTypes.bool.isRequired,
    mouseOver: PropTypes.bool.isRequired,
  },

  components: {
    VoiceFavouriteOn,
    VoiceFavouriteOff,
  },
};
</script>

<style lang="scss">
  .vm-voice__favourite {
    position: absolute;
    top: 0.6em;
    right: 1.6em;
    padding: 0 4px;
    border-radius: 100%;
    background-color: #ffffff;
  }
</style>
