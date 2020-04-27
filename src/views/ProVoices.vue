<template>
  <Voices :voices="voices()" />
</template>

<script>
import { mapGetters } from 'vuex';
import Voices from '@/components/Voices.vue';

export default {
  name: 'ProVoices',

  components: {
    Voices,
  },

  methods: {
    ...mapGetters({
      voices: 'voices/voices',
    }),
  },
};
</script>
