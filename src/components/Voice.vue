<template>
  <p>{{ voice }}</p>
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
