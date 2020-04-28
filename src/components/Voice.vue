<template>
  <div
    class="vm-voice"
    v-bind:class="{ 'vm-voice__selected': selectedVoice }"
    @click="onClickVoice"
    @mouseover="onMouseOverVoice"
    @mouseleave="onMouseLeaveVoice"
  >
    <img
      :alt="voice.name"
      :src="`/images/${this.voice.icon}`"
    >

    <p class="body-2">
      {{ voice.name }}
    </p>

    <VoiceFavourite
      :voice="voice"
      :mouseOver="mouseOverVoice"
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
    mouseOverVoice: false,
    selectedVoice: false,
  }),

  methods: {
    onClickVoice() {
      this.selectedVoice = !this.selectedVoice;
      // TODO: play the voice
    },

    onMouseOverVoice() {
      this.mouseOverVoice = true;
    },

    onMouseLeaveVoice() {
      this.mouseOverVoice = false;
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

    &.vm-voice__selected {
      img {
        background: rgb(0,197,255);
        background: linear-gradient(
          90deg,
          rgba(0,197,255,1) 0%,
          rgba(0,212,255,1) 50%,
          rgba(0,229,255,1) 100%
        );
      }
    }
  }
</style>
