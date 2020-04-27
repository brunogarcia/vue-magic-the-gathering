<template>
  <div
    class="vm-voice"
    @mouseover="onMouseOverImage"
    @mouseleave="onMouseLeaveImage"
  >
    <div
      v-if="showVoiceFavouriteOn"
      class="vm-voice-favourite--on"
    >
      <VoiceFavouriteOn />
    </div>

    <img
      :alt="voice.name"
      :src="`/images/${this.voice.icon}`"
    >

    <p class="body-2">
      {{ voice.name }}
    </p>
  </div>
</template>

<script>
import types from '@/utils/types';
import VoiceFavouriteOn from '@/assets/voice-favourite.svg';
// import VoiceFavouriteOff from '@/assets/voice-favourite-off.svg';

export default {
  name: 'Voice',

  props: {
    voice: types.voice,
  },

  data: () => ({
    showVoiceFavouriteOn: false,
  }),

  components: {
    VoiceFavouriteOn,
    // VoiceFavouriteOff,
  },

  methods: {
    onMouseOverImage() {
      this.showVoiceFavouriteOn = true;
    },

    onMouseLeaveImage() {
      this.showVoiceFavouriteOn = false;
    },
  },
};
</script>

<style lang="scss">
  .vm-voice {
    position: relative;
    cursor: pointer;
    img {
      border-radius: 100%;
      background-color: #d2d2d2;
    }

    .vm-voice-favourite--on {
      position: absolute;
      top: 0.6em;
      right: 1.6em;
      padding: 0 4px;
      border-radius: 100%;
      background-color: #ffffff;
    }
  }
</style>
