<template>
  <div :class="$style.card">
    <img :class="$style.logo" :src="logo" :alt="company" />
    <div :class="$style.content">
      <div>{{ company }}</div>
      <h2>{{ jobTitle }}</h2>
      <div :class="$style.info">
        <Tag :text="tag" :class="$style.tag" />
        <div class="flex-align">
          <InfoText icon="public" :text="location" class="margin-right--28" />
          <InfoText  icon="query_builder" :text="formatDate(time)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Tag from './Tag.vue';
import InfoText from './InfoText.vue';
import helperMethods from '../mixins/helperMethods';

const JobCard = defineComponent({
  mixins: [helperMethods],

  components: {
    Tag,
    InfoText,
  },

  props: {
    logo: String,
    company: String,
    jobTitle: String,
    tag: String,
    location: String,
    time: String,
  },
});
export default JobCard;
</script>

<style lang="scss" module>
.card {
  cursor: pointer;
  padding: 12px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-bottom: 32px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  &:hover {
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1);
  }
}

.content > :first-child {
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  margin-bottom: 8px;
}

.content > :nth-child(2) {
  font-weight: 400;

}

.logo {
  height: 90px;
  min-width: 90px;
  max-width: 90px;
  width: 100%;
  object-fit: contain;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
}

.content {
//   width: 100%;
  margin-left: 16px;
  flex-shrink: 1;
  flex-grow: 1;

  //   flex-grow: 2;
}

.info {
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
}

.tag {
  margin-top: 12px;
}

@media screen and (max-width: 768px) {
  .info {
    flex-direction: column;
    align-items: flex-start;
  }

  .content > :nth-child(2) {
    font-size: 16px;
    line-height: 19px;
  }
}
</style>
