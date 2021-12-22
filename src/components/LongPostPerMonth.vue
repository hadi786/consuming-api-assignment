<template>
  <button @click="long_post_per_month">Longest post by character length per month</button>
</template>

<script>
export default {
  props: {
    total_posts: Array
  },
  methods: {
    async long_post_per_month(){
      let posts = this.total_posts
      let posts_per_month = this.all_post_per_month(posts)
      let years_months = Object.keys(posts_per_month)
      let longest_post_per_month = []
      years_months.forEach(value => {
        let longest_post_data = this.get_long_char_length_posts(posts_per_month[value])
        let data = {
          month: value,
          longest_post: longest_post_data.post
        }
        longest_post_per_month.push(data)
      });
      this.$root.$emit("update_json_data", longest_post_per_month)
      console.log(longest_post_per_month)
    },

    get_long_char_length_posts(data_array){
      let char_length_post_array = []
      data_array.forEach(data_row => {
        let char_length = (data_row.message).length
        let data = {
          post: data_row,
          char_length: char_length
        }
        char_length_post_array.push(data)
      });

      let post_by_max_char_length = char_length_post_array.reduce((prev, current) => (prev.char_length > current.char_length) ? prev : current)
      return post_by_max_char_length
    }
  }
}
</script>