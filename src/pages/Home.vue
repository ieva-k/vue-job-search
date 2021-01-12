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
              <i class="material-icons icon">work_outline</i>
              <SearchInput placeholder="Title, companies, expertise or benefits" />
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
              <i class="material-icons icon">public</i>
              <SearchInput placeholder="City, state, zip code or country" />
            </div>
          </div>
          <div class="listItems">
            <RadioButton label="London" name="location" />
            <RadioButton label="Amsterdam" name="location" />
            <RadioButton label="New York" name="location" />
            <RadioButton label="Berlin" name="location" />
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
      return this.data.filter((item, index: number) => {
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
.img-wrapper {
  width: 100%;
  height: 138px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 42px;
  background-image: url('../assets/bg.png');
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.searchBar {
  width: 70%;
  height: 55px;
  padding: 4px;
  padding-left: 15px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.listItems {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  flex-direction: column;
}

.icon {
    color:#cccccc;
}

.location {
  height: 48px;
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

.locationHeading {
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  text-transform: uppercase;
  color: #b9bdcf;
}

</style>
