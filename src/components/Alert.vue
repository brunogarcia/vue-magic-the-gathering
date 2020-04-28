<template>
  <v-alert
    dense
    outlined
    type="info"
    class="vm-alert ml-6 mr-6"
  >
    {{ message }}
  </v-alert>
</template>

<script>
import PropTypes from '@znck/prop-types';

export default {
  name: 'Alert',
  props: {
    message: PropTypes.string.isRequired,
  },
};
</script>

<style lang="scss">
  .vm-alert {
    text-transform: uppercase;
  }
</style>
