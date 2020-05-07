<template>
  <div class="vm-cards-title">
    <p class="vm-cards-title-text">
      {{ text }}
    </p>
    <div class="vm-cards-title-line" />
  </div>
</template>

<script>
import PropTypes from '@znck/prop-types';

export default {
  name: 'CardsTitle',
  props: {
    text: PropTypes.string,
  },
};
</script>

<style lang="scss">
  .vm-cards-title {
    position: relative;

    .vm-cards-title-text {
      z-index: 2;
      position: relative;
      color: #333333;
      padding: 5px 10px;
      font-size: 1.2em;
      font-weight: 400;
      line-height: 1.75em;
      display: inline-block;
      text-transform: uppercase;
      background-color: white;
    }

    .vm-cards-title-line {
      z-index: 1;
      position: absolute;
      top: 20px;
      width: 100%;
      border-top: solid 1px #333333;
    }
  }
</style>
