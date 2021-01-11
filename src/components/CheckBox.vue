<template>
  <label class="checkbox">
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

<style lang="scss" scoped>
.checkBox {
  border-radius: 2px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  transition: background-color 0.2s;
}
</style>
