<template>
  <div id="nav">
    <router-link to="/">
      <Navigation />
    </router-link>
  </div>
  <router-view />
  <Footer text="Your name @ DevChallenges.io"/>
</template>

<script>
import { defineComponent } from 'vue';
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';

const App = defineComponent({
  components: {
    Navigation,
    Footer,
  },
});

export default App;
</script>

<style lang="scss">
#nav a {
    color: rgb(40, 37, 56);
  }
</style>
