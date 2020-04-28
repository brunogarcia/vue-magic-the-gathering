<template>
  <div class="vm-voices-title">
    <p class="vm-voices-title-text subtitle-1">
      {{ text }}
    </p>
    <div class="vm-voices-title-line" />
  </div>
</template>

<script>
import PropTypes from '@znck/prop-types';

export default {
  name: 'VoicesTile',
  props: {
    text: PropTypes.string,
  },
};
</script>

<style lang="scss">
  .vm-voices-title {
    position: relative;

    .vm-voices-title-text {
      color: #858585;
      text-transform: uppercase;
      background-color: #1b1b1b;
      display: inline-block;
      padding: 5px 10px;
      position: relative;
      z-index: 2;
    }

    .vm-voices-title-line {
      position: absolute;
      top: 18px;
      width: 100%;
      z-index: 1;
      border-top: solid 1px #858585;
    }
  }
</style>
