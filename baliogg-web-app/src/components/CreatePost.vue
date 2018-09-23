<template>
    <div>
        <h2>Create a post</h2>
        <p>{{message}}</p>
        <form class="post-form">
            <div class="input-control-wrapper">
                <label for="title">Title</label>
                <div>
                    <input name="title" type="text" v-model="title"/>
                </div>
            </div>
            <div class="input-control-wrapper">
                <label for="text">
                    <span>Text</span>
                </label>
                <div>
                    <textarea aria-rowspan="20" name="text" v-model="text" />
                </div>
            </div>
            <button type="button" v-on:click="createPost()">
                Create post
            </button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreatePost",
  data: () => ({
    title: "",
    text: "",
    message: ""
  }),
  methods: {
    createPost() {
      const { title, text } = this;
      axios
        .post("/baliogg/api/post", { title, text })
        .then(() => {
          this.$router.push("/");
        })
        .catch(error => {
          this.message = error.response.data;
        });
    }
  }
};
</script>

<style scoped>
.post-form input,
.post-form textarea {
  width: 100%;
}
.input-control-wrapper {
  text-align: left;
  margin-bottom: 20px;
}
</style>
