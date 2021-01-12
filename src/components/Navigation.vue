<template>
<section>
  <div class="container container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <div :class="$style.logo">
          <b>Github</b> Jobs
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const Navigation = defineComponent({

});
export default Navigation;
</script>

<style module lang="scss">

.logo {
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    line-height: 36px;
    padding: 30px;
}

</style>
