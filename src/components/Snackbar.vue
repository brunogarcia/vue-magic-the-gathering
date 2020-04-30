<template>
  <v-snackbar v-model="status">
    {{ message }}
    <v-btn
      color="green"
      text
      @click="status = false"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
import Proptypes from '@znck/prop-types';

export default {
  name: 'Snackbar',

  props: {
    message: Proptypes.string.isRequired,
  },

  data: () => ({
    status: true,
  }),
};
</script>
