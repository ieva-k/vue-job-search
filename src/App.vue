<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
  <div id="app">
    <div v-if="isPending">loading...</div>
    <div v-else-if="data">{{ data }}</div>
    <div v-if="error">404</div>
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue';
import HomeVue from './views/Home.vue';

// const Component = defineComponent({
//   components: {
//     SearchBar,
//   }
// )},

const { createApp } = HomeVue;

function useFetch(getUrl) {
  const data = ref(null);
  const error = ref(null);
  const isPending = ref(true);

  watchEffect(() => {
    isPending.value = true;
    data.value = null;
    error.value = null;

    fetch(getUrl)
      .then((res) => res.json())
      .then((_data) => {
        data.value = _data;
        isPending.value = false;
      })
      .catch((err) => {
        error.value = err;
        isPending.value = false;
      });
    console.log = '_data';
  });

  return {
    data,
    error,
    isPending,
  };
}

const Data = {
  setup(props) {
    const { data, error, isPending } = useFetch(
      () => `https://jobs.github.com/positions.json?description=python&full_time=true&location=sf'${props.id}`,
    );

    return {
      data,
      error,
      isPending,
    };
  },
};
const App = {
  components: { Data },
  data() {
    return {
      id: 1,
    };
  },
  template: '<Data: id = "id"/>',
};
export default {};
</script>

<style lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
