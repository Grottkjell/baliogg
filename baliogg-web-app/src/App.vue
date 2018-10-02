<template>
  <div id="baliogg-app">
    <div class="banner">
      <h1>Välkommen till Baliogg, Emrik och Sannas blogg av vår resa till Bali!</h1>
    </div>
    <div class="content">
      <div class="middle-column">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Posts from "./components/Posts.vue";
import CreatePost from "./components/CreatePost.vue";

export default {
  name: "baliogg-app",
  components: {
    Posts,
    CreatePost
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
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 0 100% 0;
  grid-template-columns: 0 100% 0;
  padding-top: 50px;
}

@media only screen and (min-width: 800px) {
  .content {
    -ms-grid-columns: 25% 50% 25%;
    grid-template-columns: 25% 50% 25%;
  }
}

.middle-column {
  -ms-grid-column: 2;
  grid-column-start: 2;
  grid-column-end: 3;
  padding: 25px 0;
}
</style>
