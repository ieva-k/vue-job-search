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
import { defineComponent } from 'vue';
import axios from 'axios';
import SearchBar from '../components/SearchBar.vue';

// type Data = {
//   id: string;
//   type: string;
//   url: string;
//   created_at: string;
//   company: string;
//   company_url: string;
//   location: string;
//   title: string;
//   description: string;
//   company_logo: string;
// };

const Home = defineComponent({
  name: 'Home',

  data() {
    return {
      data: [],
    };
  },

  components: {
    SearchBar,
  },

  methods: {},

  mounted() {
    // const accessPoint = 'https://cors-anywhere.herokuapp.com';
    // // const url = 'https://jobs.github.com/positions.json';
    // return axios.get(`${accessPoint}/https://jobs.github.com/positions.json?`);
    axios.get('https://raw.githubusercontent.com/mart-j/jobs/main/positions.json').then((response) => {
      console.log(response);
      return response;
    });
  },
});

export default Home;
</script>

<style lang="scss" scoped>
@import './Home.scss';
</style>
