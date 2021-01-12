<template>
  <label>
    <input type="checkbox" />
    {{ label }}
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const Component = defineComponent({
  props: {
    label: String,
  },
});
export default Component;
</script>
