<template>
  <footer :class="$style.footer">
      <div class="container container-fluid">
          <div class="row center-xs middle-xs">
              <div class="col-xs-12">
                      {{ text }}
              </div>
          </div>
      </div>

  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const Logo = defineComponent({
  props: {
    text: String,
  },
});
export default Logo;
</script>

<style module lang="scss">

.footer {
    padding: 50px;
    color: rgb(185, 189, 207);
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
}
</style>
