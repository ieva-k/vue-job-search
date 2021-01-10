<template>
  <div class="home">
    <div class="container container-fluid">
      <header class="header">
        <div class="img-wrapper">
          <SearchBar />
        </div>
      </header>
      <body></body>
      <footer></footer>
    </div>
  </div>
</template>

<script lang="ts">
import SearchBar from '../components/SearchBar.vue';

export default {
  name: 'Home',
  components: {},
};
</script>

<style lang="scss" scoped>
@import './Home.scss';
</style>
