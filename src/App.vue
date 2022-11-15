<template>
  <container>
    <StartPage
      v-if="currentPage === 'StartPage'"
      @change-page="handleChangePage"
    ></StartPage>
    <GamePage v-else-if="currentPage === 'GamePage'"></GamePage>
    <EndPage
      v-else-if="currentPage === 'EndPage'"
      @change-page="handleChangePage"
    ></EndPage>
  </container>
</template>

<script>
/* eslint-disable */
import StartPage from "./pages/StartPage.vue";
import GamePage from "./pages/GamePage.vue";
import EndPage from "./pages/EndPage.vue";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    StartPage,
    GamePage,
    EndPage,
  },
  setup() {
    const currentPage = ref("GamePage");

    function handleChangePage(pageName) {
      currentPage.value = pageName;
    }

    return {
      currentPage,
      handleChangePage,
    };
  },
};
</script>

<style></style>
