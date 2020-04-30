<template>
  <div class="text-center mt-6 pt-6">
    <v-progress-circular
      :size="70"
      :width="7"
      color="white"
      indeterminate
    />
  </div>
</template>

<script>
export default {
  name: 'Loading',
};
</script>
