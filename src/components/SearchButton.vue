<template>
  <button class="button" @click="$emit('click')">
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const Component = defineComponent({
  props: {
    label: String,
  },
  methods: {
    click() {
      console.log(111);
    },
  },
});
export default Component;
</script>

<style lang="scss" scoped>
.button {
  font: Roboto;
  font-weight: 500;
  cursor: pointer;
  background-color: #1e86ff;
  border-color: #1e86ff;
  border-radius: 4px;
  color: white;
  width: 146px;
  height: 47px;
  line-height: 18.75px;

  &:hover {
    opacity: 0.5;
  }
}
</style>
