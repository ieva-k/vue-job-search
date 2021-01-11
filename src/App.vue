<template>
  <div id="nav"><router-link to="/">Github Jobs</router-link></div>

  <!-- <button @click="redirect">Redirect</button>
  <button @click="back">Go Back</button>
  <button @click="forward">Go forward</button> -->

  <router-view />
  <div id="app"></div>
</template>

<script>
export default {
  methods: {
    redirect() {
      this.$router.push({ name: 'Home' });
    },
    back() {
      this.$router.go(-1);
    },
    forward() {
      this.$router.go(1);
    },
  },
};
</script>

<style lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
