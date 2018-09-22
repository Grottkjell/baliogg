<template>
  <div id="baliogg-app">
    <div class="banner">
      <h1>Welcome to Baliogg, Emrik and Sannas blog of our trip to Bali, enjoy!</h1>
    </div>
    <posts class="content"></posts>
  </div>
</template>

<script>
import Posts from "./components/Posts.vue";

export default {
  name: "baliogg-app",
  components: {
    Posts
  }
};
</script>

<style>
body {
  background-color: #ebfdfe;
  font-family: "Roboto Mono", monospace;
  text-align: center;
  margin: 0;
}
.banner {
  background-color: #d5fafd;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  box-shadow: 5px 0px 10px 0px;
  padding: 10px 0;
}
.content {
  display: grid;
  grid-template-columns: 100%;
  padding-top: 50px;
}

@media only screen and (min-width: 800px) {
  .content {
    grid-template-columns: 25% 50% 25%;
  }
}
</style>
