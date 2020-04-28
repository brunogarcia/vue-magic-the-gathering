<template>
  <div class="vm-voices-title">
    <p class="vm-voices-title-text">
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
      z-index: 2;
      position: relative;
      color: #858585;
      padding: 5px 10px;
      font-size: 1.2em;
      font-weight: 400;
      line-height: 1.75em;
      display: inline-block;
      text-transform: uppercase;
      background-color: #1b1b1b;
    }

    .vm-voices-title-line {
      z-index: 1;
      position: absolute;
      top: 20px;
      width: 100%;
      border-top: solid 1px #858585;
    }
  }
</style>
