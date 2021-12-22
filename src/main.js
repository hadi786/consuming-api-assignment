import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    all_post_per_month: function (posts) {
      let new_arr = {};
      for (let i = 0, len = posts.length; i < len; i++) {
        let Month_index = posts[i].created_time.lastIndexOf('-');
        let created_time = posts[i].created_time.substr(0, Month_index);
        if (!new_arr[created_time]) {
          new_arr[created_time] = [];
          new_arr[created_time].push(posts[i])
        } else {
          new_arr[created_time].push(posts[i])
        }
      }
      return new_arr
    }
  },
})

new Vue({
  render: h => h(App),
}).$mount('#app')


