<template>
  <div class="home">
    <div class="container container-fluid">
      <header class="header">
        <div class="row">
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
      </header>

      <section>
        <div class="row">
          <div class="col-xs-4">
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
          <div class="col-xs-8"></div>
        </div>
      </section>
      <section>
        <div :v-if="errored">
          <p>
            We're sorry, we're not able to retrieve this information at the moment, please try back
            later
          </p>
        </div>
        <div :v-else="loading">
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
        </div>
      </section>

      <footer></footer>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import SearchInput from '../components/SearchInput.vue';
import CheckBox from '../components/CheckBox.vue';
import RadioButton from '../components/RadioButton.vue';
import SearchButton from '../components/SearchButton.vue';
import LocationInput from '../components/LocationInput.vue';

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
  components: {
    SearchInput,
    SearchButton,
    CheckBox,
    RadioButton,
    LocationInput,
  },

  data() {
    return {
      data: [{ id: '', title: '' }],
      loading: true,
      errored: false,
    };
  },

  methods: {},
  mounted() {
    axios
      .get('https://raw.githubusercontent.com/mart-j/jobs/main/positions.json')
      .then((response) => {
        this.data = response.data;
      })
      .catch((error) => {
        this.errored = true;
      });
    // .finally(() => {
    //   this.loading = false;
    // });
  },
});
export default Home;
</script>
<style lang="scss" scoped>
@import './Home.scss';
</style>
