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
        <div class="col-xs-12">
          <div class="img-wrapper">
            <div class="searchBar">
              <i class="material-icons">work_outline</i>
              <SearchInput class="input" />
              <SearchButton label="Search" />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-4">
          <div class="listItems">
            <CheckBox label="Full time" />
          </div>
          <div>
            <h4 class="locationHeading">LOCATION</h4>
            <div class="location">
              <i class="material-icons">public</i>
              <LocationInput class="input" />
            </div>
          </div>
          <div class="listItems">
            <RadioButton label="London" />
            <br />
            <RadioButton label="Amsterdam" />
            <br />
            <RadioButton label="New York" />
            <br />
            <RadioButton label="Berlin" />
          </div>
        </div>
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
import SearchInput from '../components/SearchInput.vue';
import CheckBox from '../components/CheckBox.vue';
import RadioButton from '../components/RadioButton.vue';
import SearchButton from '../components/SearchButton.vue';
import LocationInput from '../components/LocationInput.vue';

type jobData = {
  id: string;
  title: string;
  location: string;
  created_at: string;
  company_logo: string;
  company: string;
  type: string;
};

const Home = defineComponent({
  name: 'Home',

  components: {
    JobCard,
    SearchInput,
    SearchButton,
    CheckBox,
    RadioButton,
    LocationInput,
  },

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
    axios
      .get('https://raw.githubusercontent.com/mart-j/jobs/main/positions.json')
      .then((response) => {
        this.data = response.data;
      })
      .catch((error) => {
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
