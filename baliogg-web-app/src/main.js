import Vue from 'vue'
import VueRouter from "vue-router";

import App from './App.vue'
import Posts from "./components/Posts.vue";
import CreatePost from "./components/CreatePost.vue";

Vue.config.productionTip = false

Vue.use(VueRouter);

const routes = [
  {
    path: "/publisher",
    component: CreatePost
  },
  {
    path: "/",
    component: Posts
  }
];

const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#baliogg-app')
