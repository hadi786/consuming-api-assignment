<template>
  <div class="Main">
    <h1>{{ heading }}</h1>
    <div v-if="total_posts.length > 0">
      <PostsWeekNo :total_posts="total_posts"/>
      <AvgPostPerMonth :total_posts="total_posts"/>
      <LongPostPerMonth :total_posts="total_posts"/>
      <PostsPerUserPerMonth :total_posts="total_posts"/>
    </div>
    <div class="json_section">
      {{json_data}}
    </div>
  </div>
</template>

<script>
var axios = require('axios');

import PostsWeekNo  from "./postsWeekNo"
import AvgPostPerMonth  from "./AvgPostPerMonth"
import LongPostPerMonth  from "./LongPostPerMonth"
import PostsPerUserPerMonth  from "./PostsPerUserPerMonth"

export default {
  name: 'Main',
  props: {
    heading: String
  },
  components: {
    PostsWeekNo,
    AvgPostPerMonth,
    LongPostPerMonth,
    PostsPerUserPerMonth
  },
  data(){
    return {
      sl_token: null,
      start_page: 1,
      end_page: 10,
      total_posts: [],
      json_data: {}
    }
  },
  async created(){
    await this.register_api_token()
    await this.get_total_pasts()
  },
  mounted(){
    this.$root.$on("update_json_data", (data) => {
      this.json_data = data
    })
  },
  methods: {
    async register_api_token(){
      let data = JSON.stringify({"client_id":"ju16a6m81mhid5ue1z3v2g0uh","email":"hadisoft786@gmail.com","name":"Ali Imran"});
      let config = {
        method: 'post',
        url: 'https://api.supermetrics.com/assignment/register',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

      await axios(config)
      .then(response => {
        let token_response = response.data.data
        this.sl_token = token_response.sl_token
      })
      .catch(error => {
        console.log(error);
      });
    },

    async get_total_pasts(){
      let i = this.start_page
      let total = this.end_page
      this.total_posts = []
      console.log("Getting posts....")
      for(i; i <= total; i++){
        await this.get_page_posts(i)
      }
    },

    async get_page_posts(page_no){
      let config = {
        method: 'get',
        url: 'https://api.supermetrics.com/assignment/posts?sl_token='+this.sl_token+'&page='+page_no,
      };

      await axios(config)
      .then(response => {
        let page_posts = response.data.data.posts
        page_posts.forEach(posts => {
          this.total_posts.push(posts)
        });
      })
      .catch(error => {
        console.log(error);
      });
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
  margin: 0 5px;
}
</style>
