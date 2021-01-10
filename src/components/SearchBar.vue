<template>
  <div class="searchBar">
    <input
      class="input"
      type="text"
      ref="search"
      placeholder="Title, companies, expertise or benefits"
      :model="inputValue"
      @input="$emit('inputValue', $event.target.value)"
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
  width: 790px;
  height: 55px;
  left: 325px;
  top: 142px;
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-bottom: 10px;
}
</style>
