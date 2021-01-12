import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const helperMethods = {
  methods: {
    formatDate(date: string) {
      return dayjs(date).fromNow();
    },
  },
};

export default helperMethods;
