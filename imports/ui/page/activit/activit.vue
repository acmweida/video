<template>
  <main class="ui maingrid content">
    <div class="ui container">
      <div class="ui left">
        <!-- <img
      v-bind:src="userImg"
      class="pos-abs"
      style="object-fit: cover;width: 100%;height: 100%;"
        />-->
        <div class="ui container">
          <div
            class="pos-abs"
            style="margin-left:160px;;top:20%;z-index:10;color:white;text-shadow: 2px 2px 2px #262626;"
          >
            <h1>{{user.account}}</h1>
            <i class="icon red play"></i>
            <strong>{{ user.gratuityNum ? user.gratuityNum : 0 }} ETH</strong>
            <br />
            <div style="margin-top:15px">
              <strong>
                <span style="color:red;">订阅</span>
                ：{{user.follow ? user.follow : 0 }}
              </strong>
            </div>
          </div>
          <img
            id="snapimg"
            class="sprite owl-lazy img"
            v-bind:src="userImg"
            width="90px"
            height="90px"
            style="max-height:200px;"
            alt
          />
        </div>
      </div>
      <div style="display: grid;">
        <Videosnapactivit v-for="video in videos" v-bind:key="video._id" v-bind:video="video"></Videosnapactivit>
      </div>
    </div>
  </main>
</template>

<script>
import Videosnapactivit from "../../components/video/videosnapactivit";
import { Sub } from "../../collections/collection";
import { Video } from "../../collections/collection";
// import { User } from "../../collections/collection"
export default {
  meteor: {
    $subscribe: {
      videoAll: [],
      sub: []
      // user:[]
    },
    videos: function() {
      var user = JSON.parse(localStorage.getItem("isLogin").toString());
      console.log(user);
      if (!user) {
        return;
      }
      var subs = Sub.findOne({ userid: user.user.publicKey });
      if (!subs) {
        return;
      }
      var videos = Video.find({ author: { $in: subs.subs } },{$sort:{createDate:-1}}).fetch();
      // console.log(subs);
      // console.log(videos);
      return videos;
    }
  },
  data() {
    return {
      user: null
    };
  },
  created() {
    var user = JSON.parse(localStorage.getItem("isLogin").toString());
    console.log(user);
    if (!user) {
      this.$router.replace("/user/login");
      return;
    }
    this.user = user.user;
  },
  components: {
    Videosnapactivit
  },
  computed: {
    userImg: function() {
      var img =
        this.user && this.user.pic
          ? Meteor.settings.IPFS.file_base_url + this.user.pic
          : "/static/images/user.png";
      return img;
    }
  }
};
</script>

<style scoped>
.left {
  float: left;
  margin-top: 15px;
  width: 300px;
  height: 150px;
  border: 2px solid #000000;
  padding: 10px;
  border-radius: 15px;
  /* background-color: red; */
}

.img {
  margin-left: 25px;
  margin-top: 25px;
}
</style>