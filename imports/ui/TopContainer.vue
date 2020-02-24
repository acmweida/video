<template>
  <div class="international-home">
    <div class="international-header report-wrap-module">
      <div class="mini-header m-header">
        <div class="mini-header__content mini-header--login">
          <Cmenu></Cmenu>
          <Search></Search>
          <User></User>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cmenu from "./components/comment/menus";
import Search from "./components/comment/search";
import User from "./components/comment/user";

export default {
  components: {
    Cmenu,
    Search,
    User
  }
};
</script>

<style scoped>
.mini-header {
  background-color: red;
}
</style>
