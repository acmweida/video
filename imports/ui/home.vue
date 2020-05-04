<template>
  <div id="main">
    <div class="pushable">
      <div class="pusher">
        <div>
          <TopContainer></TopContainer>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import SuiVue from "semantic-ui-vue";
Vue.use(SuiVue);
import "semantic-ui-css/semantic.min.css";
import TopContainer from "./TopContainer";
import WEB3Util from "../api/eth/web3";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    TopContainer
  }
};
</script>