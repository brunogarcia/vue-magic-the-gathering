<template>
  <v-container>
    <v-row class="text-center">
      <v-col
        v-for="voice in voices"
        :key="voice.id"
        cols="6"
        sm="3"
        md="2"
      >
        <Voice :voice="voice" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import types from '@/utils/types';
import Voice from '@/components/Voice.vue';

export default {
  name: 'Voices',

  components: {
    Voice,
  },

  props: {
    voices: types.voices,
  },
};
</script>
