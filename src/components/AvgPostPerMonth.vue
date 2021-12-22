<template>
  <button @click="avg_post_per_month">Average character length of posts per month</button>
</template>

<script>
export default {
  props: {
    total_posts: Array
  },
  methods: {
    async avg_post_per_month(){
      let posts = this.total_posts
      let posts_per_month = this.all_post_per_month(posts)
      let years_months = Object.keys(posts_per_month)
      let avg_chr_per_month = []
      years_months.forEach(value => {
        let data = {
          month: value,
          avg_char_length: this.get_avarge_char_length(posts_per_month[value])
        }
        avg_chr_per_month.push(data)
      });
      this.$root.$emit("update_json_data", avg_chr_per_month)
      console.log(avg_chr_per_month)
    },

    get_avarge_char_length(data_array){
      let char_length_array = []
      data_array.forEach(data_row => {
        let char_length = (data_row.message).length
        char_length_array.push(char_length)
      });
      const sum = char_length_array.reduce((a, b) => a + b, 0);
      const avg = (sum / char_length_array.length) || 0;
      return Math.round(avg)
    }
  }
}
</script>