<template>
  <button :class="$style.button">
    <i :class="$style.icon" class="material-icons">{{ icon }}</i>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const ControlButton = defineComponent({
  props: {
    icon: String,
  },
});
export default ControlButton;
</script>

<style module lang="scss">
.button {
  cursor: pointer;
  background-color: #1e86ff;
  border: none;
  border-radius: 4px;
  color: white;
  padding: 5px;
  transition: 0.2s;
  margin: 5px;
  margin-right: 0;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.5;
  }

.icon {
  color: white;
}

}
</style>
