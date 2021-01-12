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
              <SearchInput
                placeholder="Title, companies, expertise or benefits"
                v-model:inputValue="description"
              />
              <SearchButton label="Search" />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-4">
          <div class="listItems">
            <CheckBox label="Full time" v-model:checkboxValue="isFullTime" />
          </div>
          <div>
            <h4 class="locationHeading">LOCATION</h4>
            <div class="location">
              <i class="material-icons icon">public</i>
              <SearchInput
                placeholder="City, state, zip code or country"
                v-model:inputValue="location"
              />
            </div>
          </div>
          <div class="listItems">
            <RadioButton
              value="amsterdam"
              label="Amsterdam"
              name="1"
              @change="location = $event.target.value"
            />
            <RadioButton
              value="munich"
              label="Munich"
              name="1"
              @change="location = $event.target.value"
            />
            <RadioButton
              value="berlin"
              label="Berlin"
              name="1"
              @change="location = $event.target.value"
            />
            <RadioButton
              value="portland"
              label="Portland"
              name="1"
              @change="location = $event.target.value"
            />
          </div>
        </div>
        <div class="col-xs-12 col-md-8">
          <JobCard
            v-for="item in pageContent"
            :key="item.id"
            :logo="item.company_logo"
            :jobTitle="item.title"
            :company="item.company"
            :tag="item.type"
            :location="item.location"
            :time="item.created_at"
            @click="$router.push({ path: `/job/${item.id}` })"
          />
          <div class="pageControls">
            <span>{{ currentPage(page) }} / {{ totalPageCount(jobSearchFiltered.length) }}</span>
            <div class="controls">
              <ControlButton v-if="page >= 5" @click="page -= 5" icon="navigate_before" />
              <ControlButton
                v-if="jobSearchFiltered.length > 5 && page + 5 < jobSearchFiltered.length"
                @click="page += 5"
                icon="navigate_next"
              />
            </div>
          </div>
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
import ControlButton from '../components/ControlButton.vue';

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
    ControlButton,
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
      location: '',
      description: '',
      isFullTime: false,
    };
  },

  methods: {
    currentPage(num: number) {
      const page = (num + 5) / 5;
      return page;
    },

    totalPageCount(num: number) {
      const count = Math.ceil(num / 5);
      return count;
    },

    locationSearch(ob: jobData[]) {
      return ob.filter((item) => item.location.toLowerCase().includes(this.location.toLowerCase()));
    },

    includesDescript(string: string) {
      return string.toLowerCase().includes(this.description.toLowerCase());
    },

    descriptionSearch(ob: jobData[]) {
      return ob.filter(
        ({ company, title }) => this.includesDescript(company) || this.includesDescript(title),
      );
    },

    fullTimeSearch(ob: jobData[]) {
      if (this.isFullTime) {
        return ob.filter((item) => item.type.toLowerCase() === 'full time');
      }
      return ob;
    },
  },

  computed: {
    jobSearchFiltered(): jobData[] {
      // Description + fullTime + Location search
      if (this.isFullTime && this.description && this.location) {
        return this.descriptionSearch(this.locationSearch(this.fullTimeSearch(this.data)));
      }
      // Location + description search
      if (this.location && this.description) {
        return this.descriptionSearch(this.locationSearch(this.data));
      }
      // Location + fullTime search
      if (this.location && this.isFullTime) {
        return this.locationSearch(this.fullTimeSearch(this.data));
      }
      // Description + fullTime search
      if (this.isFullTime && this.description) {
        return this.descriptionSearch(this.fullTimeSearch(this.data));
      }
      // Location search
      if (this.location) {
        return this.locationSearch(this.data);
      }
      // Description search
      if (this.description) {
        return this.descriptionSearch(this.data);
      }
      // Full Time search
      if (this.isFullTime) {
        return this.fullTimeSearch(this.data);
      }
      // default All
      return this.data;
    },

    pageContent(): jobData[] {
      return this.jobSearchFiltered.filter((item, index: number) => {
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
  color: #cccccc;
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

.pageControls {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.controls {
  display: flex;
}
</style>
