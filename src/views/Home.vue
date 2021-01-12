<template>
  <section v-if="errored">
    <div class="container container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <p>
            We're sorry, we're not able to retrieve this information at the moment, please try back
            later
          </p>
        </div>
      </div>
    </div>
  </section>
  <section v-else>
    <div class="container container-fluid">
      <div v-if="loading">Loading...</div>
      <div v-else class="row">
        <div class="col-xs-12 col-md-4"></div>
        <div class="col-xs-12 col-md-8">
          <JobCard
            v-for="item in data"
            :key="item.id"
            :logo="item.company_logo"
            :jobTitle="item.title"
            :company="item.company"
            :tag="item.type"
            :location="item.location"
            :time="item.created_at"
            @click="$router.push({ path: `/job/${item.id}` })"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import { defineComponent } from 'vue';
import axios from 'axios';
import JobCard from '../components/JobCard.vue';
import SearchBar from '../components/SearchBar.vue';

type jobData = {
  id: string;
  title: string;
  location: string;
  created_at: string;
  company_logo: string;
  company: string;
  type: string;
};

type Data = {
  data: jobData[];
  loading: boolean;
  errored: boolean;
  page: number;
  location: string;
};

const Home = defineComponent({
  name: 'Home',
  data() {
    return {
      data: [
        {
          id: '',
          title: '',
          location: '',
          created_at: '',
          company_logo: '',
          company: '',
          type: '',
        },
      ],
      loading: true,
      errored: false,
      page: 0,
      location: 'Berlin',
    };
  },
  components: {
    SearchBar,
    JobCard,
  },
  methods: {},

  computed: {
    locationSearch(): jobData[] {
      return this.data.filter((item) => item.location.includes(this.location));
    },

    pageContent(): jobData[] {
      return this.locationSearch.filter((item, index: number) => {
        if (index >= this.page && index < this.page + 5) {
          return item;
        }
        return '';
      });
    },
  },

  mounted() {
    const accessPoint = 'https://cors-anywhere.herokuapp.com';
    // // const url = 'https://jobs.github.com/positions.json';
    // return axios.get(`${accessPoint}/https://jobs.github.com/positions.json?`);
    axios
      .get('https://raw.githubusercontent.com/mart-j/jobs/main/positions.json')
      // .get(`${accessPoint}/https://jobs.github.com/positions.json?`)
      // .get('https://jobs.github.com/positions.json?')
      .then((response) => {
        this.data = response.data;
        console.log(response.data);
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
