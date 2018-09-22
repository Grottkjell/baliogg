<template>
  <div>
    <div v-if="message">
      {{message}}
    </div>
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
  data() {
    return {
      posts: [],
      message: ""
    };
  },
  created() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      this.message = "Loading blog posts...";
      axios
        .get("/baliogg/api/post")
        .then(response => {
          this.posts = response.data;
          this.message = "";
        })
        .catch(() => {
          this.message =
            "Error loading blog posts, contact admin if problem persists!";
        });
    }
  },
  filters: {
    dateFormat(date) {
      if (!date) {
        return "";
      }
      return new Date(date).toLocaleDateString();
    }
  }
};
</script>

<style scoped>
.post img {
  max-width: 100%;
}
</style>
