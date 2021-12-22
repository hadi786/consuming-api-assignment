<template>
  <button @click="total_posts_per_week">Total posts split by week number</button>
</template>

<script>
const groupBy = require('lodash/groupBy');
const moment = require('moment');
export default {
  props: {
    total_posts: Array
  },
  methods: {
    async total_posts_per_week(){
      let total_posts = this.total_posts
      let group_by_years = groupBy(total_posts, (dt) => moment(dt.created_time).year());
      let years = Object.keys(group_by_years)
      let posts_per_week = {}
      years.forEach(year => {
        let group_by_week_no = groupBy(group_by_years[year], (dt) => moment(dt.created_time).week());
        posts_per_week[years] = []
        posts_per_week[years] = group_by_week_no
      });
      
      this.$root.$emit("update_json_data", posts_per_week)
      console.log(posts_per_week)
    },
  }
}
</script>