<template>
  <div
    class="vm-voice"
    @mouseover="onMouseOverVoiceFavourite"
    @mouseleave="onMouseLeaveVoiceFavourite"
  >
    <img
      :alt="voice.name"
      :src="`/images/${this.voice.icon}`"
    >

    <p class="body-2">
      {{ voice.name }}
    </p>

    <VoiceFavourite
      :favourite="false"
      :mouseOver="mouseOverVoiceFavourite"
    />
  </div>
</template>

<script>
import types from '@/utils/types';
import VoiceFavourite from '@/components/VoiceFavourite.vue';

export default {
  name: 'Voice',

  props: {
    voice: types.voice,
  },

  components: {
    VoiceFavourite,
  },

  data: () => ({
    mouseOverVoiceFavourite: false,
  }),

  methods: {
    onMouseOverVoiceFavourite() {
      this.mouseOverVoiceFavourite = true;
    },

    onMouseLeaveVoiceFavourite() {
      this.mouseOverVoiceFavourite = false;
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
  }
</style>
