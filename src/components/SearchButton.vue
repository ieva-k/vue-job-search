<template>
  <button :class="$style.button">
    {{ label }}
  </button>
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

<style module lang="scss">
.button {
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  cursor: pointer;
  background-color: #1e86ff;
  border: none;
  border-radius: 4px;
  color: white;
  height: 100%;
  width: 100%;
  max-width: 145px;
  transition: 0.2s;

  &:hover {
    opacity: 0.5;
  }

  &:focus {
    outline: none;
  }
}
</style>
