<template>
  <div>
    <div v-if="message">
      {{message}}
    </div>
    <div class="loading-indicator" v-if="loadingPosts">
      <circle10></circle10>
    </div>
    <div class="post" v-for="post in postsSortedByDate" v-bind:key="post.uploadDate">
      <h2>{{post.title}}</h2>
      <img v-for="(image, key) in post.image" v-bind:key="key" v-bind:src="'images/' + image">
      <p v-if="post.text">{{post.text}}</p>
      <p><i>{{post.uploadDate | dateFormat}}</i></p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {Circle10} from 'vue-loading-spinner'

export default {
  name: "Posts",
  components: {
    Circle10
  },
  data() {
    return {
      posts: [],
      message: "",
      loadingPosts: false
    };
  },
  created() {
    this.getPosts();
  },
  mounted() {
    /**
     * Set using JS since vue-loading-spinner does, simply setting it in the style tag of this component will be overriden.
     */
    document.querySelector(".spinner-inner").style.transform = "scale(1)";
  },
  methods: {
    getPosts() {
      this.loadingPosts = true;
      axios
        .get("/baliogg/api/post")
        .then(response => {
          this.posts = response.data;
          this.message = "";
        })
        .catch(() => {
          this.message =
            "Error loading blog posts, contact admin if problem persists!";
        })
        .then(() => {
          this.loadingPosts = false;
        });
    }
  },
  computed: {
    postsSortedByDate: function() {
      if (this.posts) {
        return this.posts.slice().sort((p1, p2) => {
          if (p1.uploadDate && p2.uploadDate) {
            return p1.uploadDate > p2.uploadDate ? -1 : 1;
          } else {
            return 0;
          }
        });
      } else {
        return this.posts;
      }
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
.loading-indicator {
  margin-left: 50%
}
.post img { 
  max-width: 100%;
}
.post:not(:last-of-type) {
  margin-bottom: 200px;
}
.post:not(:first-of-type) {
  border-top: 1px solid gray;
}
</style>
