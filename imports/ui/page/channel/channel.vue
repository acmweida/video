<template >
  <div style="width: 100%;margin-top: -23px;">
    <div class="top-banner"></div>
    <channeldesktopcover v-if="author" v-bind:author="author"></channeldesktopcover>
    <div class="ui container"  style="margin-top:5px">
      <div class="ui top attached tabular menu" style="margin-top: 0rem;display:inline-block;">
        <a
          v-on:click="toVideo"
          class="item videos active"
          style="display:inline-block;"
          data-tab="first"
        >{{ translate('CHANNEL_VIDEOS')}}</a>
        <a
          v-if="isAuthor"
          v-on:click="toActivit"
          class="item activities"
          style="display:inline-block;"
          data-tab="second"
        >{{ translate('CHANNEL_PERSON_INFO')}}</a>
          <a
          v-if="isAuthor"
          v-on:click="toTransactionLog"
          class="item transaction"
          style="display:inline-block;"
          data-tab="third"
        >{{ translate('TRANSFOR_LOG')}}</a>
          <a
          v-if="isAuthor"
          v-on:click="toTransactionFrom"
          class="item transactionfrom"
          style="display:inline-block;"
          data-tab="fourth"
        >{{ translate('ACCEPT_LOG')}}</a>
        <!-- {{#if equals author.name activeUsername}} -->
        <!-- {{/if}} -->
      </div>
      <div
        v-show="currentTab == 'first'"
        class="ui bottom attached tab segment active"
        data-tab="first"
        style="margin:auto;padding-left: 1px;padding-right:1px;border-width: 0px;background: transparent;"
      >
        <div class="ui infinite">
          <!-- {{#if userVideos}}  -->
          <videoband v-if="author" v-bind:videoInfo="videos"></videoband>
          <!-- {{/if}} -->
          <div class="ui large centered inline text loader"></div>
        </div>
      </div>
      <div
        v-if="currentTab == 'second'"
        class="ui bottom attached tab segment active"
        data-tab="second"
        style="margin:auto;padding-left: 1px;padding-right:1px;border-width: 0px;background: transparent;"
      >
        <div class="ui infinite">
          <personal v-if="author" v-bind:author="author"></personal>
          <div class="ui large centered inline text loader"></div>
        </div>
      </div>
      <div
        v-if="currentTab == 'third'"
        class="ui bottom attached tab segment active"
        data-tab="third"
        style="margin:auto;padding-left: 1px;padding-right:1px;border-width: 0px;background: transparent;"
      >
        <div class="ui infinite">
          <transforto v-if="author"></transforto>
          <div class="ui large centered inline text loader"></div>
        </div>
      </div>
        <div
        v-if="currentTab == 'fourth'"
        class="ui bottom attached tab segment active"
        data-tab="third"
        style="margin:auto;padding-left: 1px;padding-right:1px;border-width: 0px;background: transparent;"
      >
        <div class="ui infinite">
          <transfrom  v-if="author"></transfrom>
          <div class="ui large centered inline text loader"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { User, Video } from "../../collections/collection";
import videoband from "../../components/video/videoband";
import channeldesktopcover from "./topcover/channeldesktopcover";
import personal from "./personal/personal";
import transforto from "./transforlog/transforto"
import transfrom from "./transforlog/transforFrom"
export default {
  data() {
    return {
      currentTab: "first"
    };
  },
  computed: {
    isAuthor: function() {
      if (!this.author) return false;
      // var user = Session.get("isLogin");
      var user = JSON.parse(localStorage.getItem("isLogin").toString());

      // console.log(user.user);
      // console.log(this.author.publicKey)
      var author = this.author;
      var res = {};
      return this.author && user && user.user.publicKey == this.author.publicKey;
    }
  },
  components: {
    channeldesktopcover,
    videoband,
    personal,
    transforto,
    transfrom
  },
  methods: {
    toActivit: function() {
      if (this.currentTab == "second") return;
      this.currentTab = "second";
      $(".menu .item.activities").click();
      $(".menu .item.activities")
        .addClass("active")
        .siblings()
        .removeClass("active");
    },
    toVideo: function() {
      if (this.currentTab == "first") return;
      this.currentTab = "first";
      $(".menu .item.videos").click();
      $(".menu .item.videos")
        .addClass("active")
        .siblings()
        .removeClass("active");
    },
    toTransactionLog: function() {
      if (this.currentTab == "third") return;
      this.currentTab = "third";
      $(".menu .item.transaction").click();
      $(".menu .item.transaction")
        .addClass("active")
        .siblings()
        .removeClass("active");
    },
    toTransactionFrom:function() {
        if (this.currentTab == "fourth") return;
      this.currentTab = "fourth";
      $(".menu .item.transactionfrom").click();
      $(".menu .item.transactionfrom")
        .addClass("active")
        .siblings()
        .removeClass("active");
    }
  },
  meteor: {
    $subscribe: {
      user: [],
      videoAll: []
    },
    author: function() {
      var res =  User.findOne({ account: this.$route.params.id });
      return  res;
    },
    videos: function() {
      if (!this.author) return;
      var user = Session.get("isLogin");
      var videos = []
      console.log(this.author);
      var res = {};
      if (user && user.user.publicKey == this.author.publicKey) {
        videos =  Video.find({ 'author': this.author.publicKey }).fetch();
        res.videos = videos;
        res.isAuthor = true;
      } else {
        videos =  Video.find({$and:[{ 'author': this.author.publicKey, 'waive': true}]}).fetch();
        console.log(videos)
        res.videos = videos;
        res.isAuthor = false;
      }
      return res;
    }
  }
};
</script>

<style scoped>
.top-banner {
  background: white;
  /* height: 10px; */
  text-align: center;
  margin-bottom: 40px;
}
</style>



