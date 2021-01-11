<template>
  <div>
    <input
      class="input"
      type="text"
      ref="search"
      placeholder="City, state, zip code or country"
      :model="inputValue"
      @input="$emit('inputValue', $event.target.value)"
      @keyup.enter="inputValue"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const Component = defineComponent({
  props: {
    inputValue: {
      type: String,
      required: true,
    },
  },
});
export default Component;
</script>

<style lang="scss" scoped>
.input {
  padding: 10px;
  background-color: #ffffff;
  border: none;
  border-radius: 4px;
  width: 100%;
}
</style>
