<template>
    <input
      :class="$style.input"
      type="text"
      :placeholder="placeholder"
      :value="inputValue"
      @input="$emit('update:inputValue', $event.target.value)"
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const Component = defineComponent({
  props: {
    inputValue: {
      type: String,
      required: true,
    },
    placeholder: String,
  },
});
export default Component;
</script>

<style lang="scss" module>

.input {
  padding: 7px;
  padding-left: 17px;
  background-color: #ffffff;
  border: none;
  border-radius: 4px;
  width: 100%;
}
</style>
