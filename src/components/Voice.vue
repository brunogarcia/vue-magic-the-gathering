<template>
  <div class="vm-image">
    <img
      :src="`/images/${this.voice.icon}`"
      :alt="voice.name"
    >
    <p>
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

  methods: {
    getImageSrc() {
    },
  },
};
</script>
