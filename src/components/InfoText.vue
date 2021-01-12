<template>
  <div :class="$style.infoText">
    <i :class="$style.icon" class="material-icons">{{ icon }}</i>
    <span>{{ text }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const InfoText = defineComponent({
  props: {
    icon: String,
    text: String,
  },
});
export default InfoText;
</script>

<style lang="scss" module>

.infoText {
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 14px;
  color: rgb(185, 189, 207);
  margin-top: 10px;
}

.icon {
  margin-right: 7px;
  font-size: 15px;
}

</style>
