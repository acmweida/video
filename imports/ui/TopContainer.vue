<template>
  <div
    class="ui large borderless main menu fixed"
    style="height:57px; z-index:9000;  background-color: red;"
  >
    <div class="left floated menu" style="width:60%">
      <a href="/" class="blacklogo header item" id="textlogo">
        <img alt style="width:90px;height:60px;margin-left: 20px;" src="/static/images/video1.png" />
      </a>
      <Cmenu></Cmenu>
      <Search></Search>
    </div>
    <User></User>
    <Upload></Upload>
  </div>
</template>

<script>
import Cmenu from "./components/menus";
import Search from "./components/search";
import User from "./components/user";
import Upload from './components/upload'

export default {
  components: {
    Cmenu,
    Search,
    User,
    Upload
  }
};
</script>

<style>
</style>
