<template>
  <button @click="get_users_from_posts">Average number of posts per user per month</button>
</template>

<script>
export default {
  props: {
    total_posts: Array
  },
  methods: {
    async get_users_from_posts(){
      let posts = this.total_posts
      let new_arr = {};
      for (let i = 0, len = posts.length; i < len; i++) {
        let from_id = posts[i].from_id
        let users_posts = posts.filter(data => {
          return data.from_id == from_id
        })
        new_arr[posts[i].from_id] = [];
        new_arr[posts[i].from_id] = this.all_post_per_month(users_posts)
      }
      this.$root.$emit("update_json_data", new_arr)
      console.log(new_arr)
    }
  }
}
</script>