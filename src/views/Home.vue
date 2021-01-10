<template>
  <!-- <div class="home">
    <div class="container container-fluid"> -->
  <!-- <header class="header"> -->
  <!-- <div class="img-wrapper">
          <SearchBar />
        </div> -->
  <section v-if="errored">
    <p>
      We're sorry, we're not able to retrieve this information at the moment, please try back later
    </p>
  </section>
  <section v-else>
    <div v-if="loading">Loading...</div>
    <div
      v-else
      v-for="item in data"
      class="item"
      :key="item.id"
      @click="$router.push({ path: `/job/${item.id}` })"
    >
      {{ item.title }}
    </div>
  </section>
  <!-- <div v-for="item in data"
      class="item"
      :key="item.id"
    >
    {{console(item)}}
      {{ item.company }}:
    </div> -->
  <!-- </header> -->
  <!-- <footer></footer>
    </div>
  </div> -->
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
// import SearchBar from '../components/SearchBar.vue';
type Data = {
  id: string;
  type: string;
  url: string;
  created_at: string;
  company: string;
  company_url: string;
  location: string;
  title: string;
  description: string;
  company_logo: string;
};
const Home = defineComponent({
  name: 'Home',
  data() {
    return {
      data: [{ id: '', title: '' }],
      loading: true,
      errored: false,
    };
  },
  components: {
    // SearchBar,
  },
  methods: {},
  mounted() {
    // const accessPoint = 'https://cors-anywhere.herokuapp.com';
    // // const url = 'https://jobs.github.com/positions.json';
    // return axios.get(`${accessPoint}/https://jobs.github.com/positions.json?`);
    axios
      .get('https://raw.githubusercontent.com/mart-j/jobs/main/positions.json')
      .then((response) => {
        this.data = response.data;
        console.log(1, this.data);
        console.log(2, response.data);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => {
        this.loading = false;
      });
  },
});
export default Home;
</script>
<style lang="scss" scoped>
@import './Home.scss';
</style>
