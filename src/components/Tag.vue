<template>
  <div :class="$style.tag">
    <span>{{ text }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const Tag = defineComponent({
  props: {
    text: String,
  },
});
export default Tag;
</script>

<style lang="scss" module>
$darkblue: rgb(51, 70, 128);

.tag {
  padding: 6px 8px;
  border: 1px solid $darkblue;
  border-radius: 4px;
  font-size: 12px;
  line-height: 14px;
  font-weight: 700;
  background-color: transparent;
  display: inline-block;
}

</style>
