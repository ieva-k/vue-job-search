<template>
  <label :class="$style.radio">
    <input type="radio" :name="name" :value="value" />
    {{ label }}
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const Component = defineComponent({
  props: {
    label: String,
    name: String,
    value: String,
  },
});
export default Component;
</script>

<style module lang="scss">
  .radio {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
  }

  .radio > input {
    margin: 0;
    margin-right: 10px;
  }
</style>
