<template>
  <div>
    <div class="post" v-for="post in posts" v-bind:key="post.uploadDate">
      <h2>{{post.title}}</h2>
      <img v-if="post.image" v-bind:src="post.image">
      <p v-if="post.text">{{post.text}}</p>
      <p><i>{{post.uploadDate | dateFormat}}</i></p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Posts",
  data: function() {
    return {
      posts: []
    };
  },
  created: function() {
    this.getPosts();
  },
  methods: {
    getPosts: function() {
      this.message = "Loading blog posts...";
      axios
        .get("/baliogg/api/post")
        .then(response => {
          this.posts = response.data;
        })
        .catch(() => {
          this.message =
            "Error loading blog posts..., contact admin if problem persists!";
        });
    }
  },
  filters: {
    dateFormat: function(date) {
      if (!date) {
        return "";
      }
      return new Date(date).toLocaleDateString();
    }
  }
};
</script>

<style scoped>
.post {
  grid-column-start: 2;
  grid-column-end: 3;
  padding: 25px 0;
}
.post img {
  max-width: 100%;
}
</style>
