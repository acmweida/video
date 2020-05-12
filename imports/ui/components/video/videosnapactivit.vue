<template>
  <div class="all">
    <div class="main">
      <a :href="/c/+author.account" target="_blank">
        <img style="margin-top:20px;" class="ui tiny circular image" v-bind:src="authorImg" />
      </a>
    </div>
    <div class="side">
      <div style="margin-left:15px">
        <a :href="/c/+author.account" target="_blank">
          <h1 style="color:red;margin-top:15px">{{author.account}}</h1>
           <div class="videosnaptime">{{date}}</div>
        </a>
      </div>
      <div class="video">
        <a v-bind:title="title" :href="'/user/video/'+video.ipfs" target="_blank">
          <div id="snaphover" class="videosnapsnap wid-ful" style="height:200px;">
            <div class="pos-abs wid-ful" style="z-index:1; height:118px;">

              <div
                id="watchlater"
                class="addwatchlater snapbutton right floated pos-abs dsp-non"
                title="Watch later"
                style="float: right; right: 5px; background: black; top: 5px; border-radius: 4px; opacity: 0.9; z-index:999;"
              >
                <i
                  class="time icon"
                  style="padding: 0px; color:white; margin: 8px; font-size: 1.2em;"
                >
                  <span style="z-index:9000;"></span>
                </i>
              </div>

              <div
                id="snapload"
                class="ui snaploader pos-abs wid-ful loaded"
                style="z-index:-1; background-color: rgba(167, 167, 167, 0.85); height:200px; display: block; text-align: center;"
              >
                <i class="icon photo nosnap" style="font-size:28px; margin-top:40px;"></i>
                <div
                  class="ui text nosnap"
                  style="margin-top:10px;"
                >{{ translate('SNAP_MISSING_IMAGE')}}</div>
              </div>
              <img
                id="snapimg"
                class="sprite owl-lazy"
                v-bind:src="imgUrl"
                width="100%"
                height="200px"
                style="max-height:200px;"
                alt
              />
            </div>
            <br />
          </div>
        </a>
        <div class="boxdisplayer">
          <div class="videosnaptitle">
            <a :href="'/user/video/'+video.ipfs" target="_blank">
              <span class="customtitlelink" style="margin-top: 10px;font-size:12px;font-weight:bold;">{{title}}</span>
            </a>
          </div>
        </div>
        <div class="videosnapdetails">
          <div class="videosnaprest">{{author.gratuityNum}} ETH</div>
         
        </div>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
import { User } from "../../collections/collection";
// import {User} from "../../collections/collection"
export default {
  props: {
    video: Object
  },
  data() {
    return {
      thumbsup: numForm(this.video.thumbsup),
      imgUrl: Meteor.settings.IPFS.file_base_url + this.video.cover,
      title: this.video.title,
      gratuityNum: numForm(this.video.gratuityNum),
      date: this.dateFrom(new Date(this.video.createDate))
    };
  },
  meteor: {
    author() {
      return User.findOne({ publicKey: this.video.author });
    }
  },
  computed: {
    authorImg: function() {
      var img =
        this.author && this.author.pic
          ? Meteor.settings.IPFS.file_base_url + this.authorInfo.pic
          : "/static/images/user.png";
      return img;
    }
  }
};
</script>

<style scoped>
span {
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
  height: 24px;
  display: block;
}
/* p,ul,li {margin:20px;padding:0;} */
/* #all {width:600px;display:flex;} */
.all {
  width: 600px;
  overflow: hidden;
  display: flex;
  margin-top: 10px;
  margin-left: 15px;
}
.main {
  width: 80px;
  /* background-color: #aeb; */
  float: left;
}
.side {
  width: 450px;
  /* background-color: #feb; */
  /* float: left; */
}

.video {
  margin-top: 15px;
  margin-left: 15px;
}

.videosnapsnap {
  max-height: 450px !important;
}
</style>