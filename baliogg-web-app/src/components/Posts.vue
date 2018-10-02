<template>
  <div>
    <div v-if="message">
      {{message}}
    </div>
    
    <transition-group name="list">
      <div class="post" v-for="post in postsSortedByDate" v-bind:key="post.uploadDate">
        <h2>{{post.title}}</h2>
        <p><i>{{post.uploadDate | dateFormat}}</i></p>
        <img v-for="(image, key) in post.image" v-bind:key="key" v-bind:src="'images/' + image">
        <p v-if="post.text">{{post.text}}</p>
      </div>
    </transition-group>
    <button type="button" class="pagination-button" v-if="!loadingPosts && posts.length < totalNumberOfPosts" v-on:click="getPosts()">Visa fler inlägg</button>
    <div class="loading-indicator" v-if="loadingPosts">
      <circle10></circle10>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Circle10 } from "vue-loading-spinner";

const POSTS_PER_PAGE = 3;

export default {
  name: "Posts",
  components: {
    Circle10
  },
  data() {
    return {
      posts: [],
      message: "",
      loadingPosts: false,
      totalNumberOfPosts: 0,
      currentPageNumber: 0
    };
  },
  created() {
    this.getPosts();
  },
  mounted() {
    this.setSpinnerStyling();
  },
  methods: {
    getPosts() {
      this.loadingPosts = true;
      this.setSpinnerStyling();
      axios
        .get("/baliogg/api/post", {
          params: {
            currentPageNumber: this.currentPageNumber++,
            postsPerPage: POSTS_PER_PAGE
          }
        })
        .then(response => {
          this.posts = this.posts.concat(response.data.posts);
          this.totalNumberOfPosts = response.data.totalNumberOfPosts;
        })
        .catch(() => {
          this.message =
            "Error loading blog posts, contact admin if problem persists!";
        })
        .then(() => {
          this.loadingPosts = false;
        });
    },
    setSpinnerStyling() {
      /**
       * Set using JS since vue-loading-spinner does, simply setting it in the style tag of this component will be overriden.
       */
      setTimeout(() => {
        const spinner = document.querySelector(".spinner-inner");
        spinner.style.transform = "scale(1)";
        spinner.style.background = "white";
        spinner.style["border-radius"] = "50%";
        spinner.style["boxShadow"] = "0 0 10px 2px";
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
  left: calc(50% - 30px);
  position: fixed;
  top: 50%;
}
.post img {
  max-width: 100%;
}
.post:not(:last-of-type) {
  padding-bottom: 100px;
}
.post:not(:first-of-type) {
  border-top: 2px solid gray;
  padding-top: 100px;
}
.post {
  opacity: 1;
}
.list-enter-active {
  transition: all 2s;
}
.list-enter {
  opacity: 0;
}
button.pagination-button {
  border: none;
  display: inline-block;
  padding: 0.7em 1.7em;
  margin: 3em 0.3em 0.3em 0;
  border-radius: 0.2em;
  box-sizing: border-box;
  text-decoration: none;
  font-size: 12pt;
  font-weight: 400;
  color: #ffffff;
  background-color: #3f51b5;
  box-shadow: inset 0 -0.6em 1em -0.35em rgba(0, 0, 0, 0.17),
    inset 0 0.6em 2em -0.3em rgba(255, 255, 255, 0.15),
    inset 0 0 0em 0.05em rgba(255, 255, 255, 0.12);
  text-align: center;
  position: relative;
}
button.pagination-button:active {
  box-shadow: inset 0 0.6em 2em -0.3em rgba(0, 0, 0, 0.15),
    inset 0 0 0em 0.05em rgba(255, 255, 255, 0.12);
}
@media all and (max-width: 30em) {
  .pagination-button {
    display: block;
    margin: 0.4em auto;
  }
}
</style>
