<template>
  <label :class="$style.checkbox">
    <input
      type="checkbox"
      :checked="checkboxValue"
      @input="$emit('update:checkboxValue', $event.target.checked)"
    />
    {{ label }}
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const Component = defineComponent({
  props: {
    label: String,
    checkboxValue: Boolean,
  },
});
export default Component;
</script>
<style module lang="scss">
  .checkbox {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
  }

  .checkbox > input {
    margin: 0;
    margin-right: 10px;
  }
</style>
