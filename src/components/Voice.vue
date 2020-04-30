<template>
  <div
    class="vm-voice"
    :class="{ 'vm-voice__selected': voice.play }"
    @click="onClickVoice"
    @mouseover="onMouseOverVoice"
    @mouseleave="onMouseLeaveVoice"
  >
    <div class="vm-voice-image">
      <img
        :alt="voice.name"
        :src="`/images/${this.voice.icon}`"
      >

      <VoiceFavourite
        :voice="voice"
        :mouseOver="mouseOverVoice"
      />
    </div>

    <p class="mt-2 body-2 font-weight-medium">
      {{ voice.name }}
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
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
  }),

  methods: {
    ...mapActions({
      togglePlayVoice: 'voices/togglePlayVoice',
    }),

    onClickVoice() {
      this.togglePlayVoice(this.voice.id);
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
    cursor: pointer;

    &:hover {
      img {
        background-color: #ffffff;
      }
    }

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

    .vm-voice-image {
      display: inline-block;
      position: relative;
    }
  }
</style>
