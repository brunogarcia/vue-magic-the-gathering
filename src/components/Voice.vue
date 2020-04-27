<template>
  <div class="vm-voice-image">
    <img
      :src="`/images/${this.voice.icon}`"
      :alt="voice.name"
    >
    <p class="body-2">
      {{ voice.name }}
    </p>
  </div>
</template>

<script>
import types from '@/utils/types';

export default {
  name: 'Voice',

  props: {
    voice: types.voice,
  },
};
</script>

<style lang="scss">
  .vm-voice-image {
    img {
      background-color: #d2d2d2;
      border-radius: 100%;
    }
  }
</style>
