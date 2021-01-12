<template>
  <section v-if="errored">
    <p>
      We're sorry, we're not able to retrieve this information at the moment, please try back later
    </p>
  </section>
  <section v-else class="job">
    <div v-if="loading">Loading...</div>
    <div v-else class="container container-fluid">
      <div class="row">
        <div class="col-xs-12 col-md-3">
          <div :class="$style.leftSide">
            <router-link class="flex-align margin-bottom--32" to="/">
              <i :class="$style.leftArrow" class="material-icons">trending_flat</i> Back to search
            </router-link>
            <div class="margin-bottom--16">HOW TO APPLY</div>
            <div v-html="data.how_to_apply"></div>
          </div>
        </div>
        <div class="col-xs-12 col-md-offset-1 col-md-8">
          <div :class="$style.rightSide">
            <div class="flex-align">
              <h1>{{ data.title }}</h1>
              <Tag :text="data.type" class="margin-left--16" />
            </div>
            <InfoText
              icon="query_builder"
              :text="formatDate(data.created_at)"
              class="margin-bottom--32"
            />
            <div :class="$style.company">
              <img :class="$style.companyLogo" :src="data.company_logo" alt="" />
              <div class="margin-bottom--32">
                <h2>{{ data.company }}</h2>
                <InfoText icon="public" :text="data.location" />
              </div>
            </div>
            <div :class="$style.content" v-html="data.description"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import InfoText from '../components/InfoText.vue';
import helperMethods from '../mixins/helperMethods';
import Tag from '../components/Tag.vue';

dayjs.extend(relativeTime);

type Data = {
  id: string;
  type: string;
  created_at: string;
  company: string;
  location: string;
  title: string;
  description: string;
  how_to_apply: string;
  company_logo: string;
};

const Job = defineComponent({
  name: 'Job',

  mixins: [helperMethods],

  data() {
    return {
      data: {},
      loading: true,
      errored: false,
    };
  },
  components: {
    InfoText,
    Tag,
  },
  methods: {},

  mounted() {
    axios
      .get('https://raw.githubusercontent.com/mart-j/jobs/main/positions.json')
      .then((response) => {
        const filteredData = response.data.find((item: Data) => item.id === this.$route.params.id);
        this.data = filteredData;
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
export default Job;
</script>

<style lang="scss" module>
$gray: rgb(185, 189, 207);

.leftArrow {
  transform: rotate(180deg);
  margin-right: 15px;
  font-size: 18px;
}

.leftSide {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
}

.leftSide > :nth-child(2) {
  font-weight: 700;
  color: $gray;
}

.company {
  display: flex;
}

.companyLogo {
  max-width: 42px;
  max-height: 42px;
  object-fit: contain;
  margin-right: 12px;
}

@media screen and (max-width: 768px) {
  .tag {
    margin: 10px 0 0 0;
  }
  .rightSide > :first-child {
    margin-top: 36px;
    display: block;
  }
}
</style>
