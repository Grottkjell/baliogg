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
                    <textarea rows="20" name="text" v-model="text" />
                </div>
            </div>
            <div class="input-control-wrapper">
                <label for="image">
                    <span>Image</span>
                    <div>
                        <input type="file" name="image" multiple/>
                    </div>
                </label>
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
      const fileInputControl = document.querySelectorAll(
        "input[name=image]"
      )[0];
      const data = new FormData();
      data.append("title", title);
      data.append("text", text);
      if (fileInputControl.files) {
        for (let index = 0; index < fileInputControl.files.length; index++) {
          const file = fileInputControl.files[index];
          data.append(`file-${index}`, file);
        }
      }
      axios
        .post("/baliogg/api/post", data, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch(error => {
          this.message = error;
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
