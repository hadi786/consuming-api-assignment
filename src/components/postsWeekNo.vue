<template>
  <button @click="total_posts_per_week">Total posts split by week number</button>
</template>

<script>
const moment = require('moment');
export default {
  props: {
    total_posts: Array
  },
  methods: {
    async total_posts_per_week(){
      let total_posts = this.total_posts
      const group_by_week_no = total_posts.reduce((acc, row) => {
        const yearWeek = `${moment(row.created_time).year()}-${moment(row.created_time).isoWeek()}`;
        if (!acc[yearWeek]) {
          acc[yearWeek] = [];
        }
        acc[yearWeek].push(row);
        return acc;
      }, {});

      console.log(group_by_week_no)
      this.$root.$emit("update_json_data", group_by_week_no)
    },
  }
}
</script>