<template name='channeldesktopcover'>
  <div id="channelcover" class="channelcover" v-bind:class="cover_image">
    <img
      v-if="author.cover_image"
      v-bind:src="author.cover_image"
      class="pos-abs"
      style="object-fit: cover;width: 100%;height: 100%;"
    />
    <div class="ui container">
      <div
        class="pos-abs"
        style="margin-left:160px;;top:20%;z-index:10;color:white;text-shadow: 2px 2px 2px #262626;"
      >
        <h1>{{author.account}}</h1>
        <i class="icon red play"></i>
        <strong>{{ author.gratuityNum ? author.gratuityNum : 0 }} ETH</strong>
        <br /><div style="margin-top:15px"><strong >{{author.desc ? author.desc : translate("AUTHOR_DESC_NO")}}</strong></div>
      </div>
      <div class="ui image circular" v-bind:style="authorImg"></div>
      <div
        v-if="isSubscribedTo"
        class="pos-rel"
        tabindex="0"
        style="float: right;top: 100px;margin-right: 10px !important;"
      >
        <buttonunsubscribe v-bind:subCount="author.follow"></buttonunsubscribe>
      </div>
      <div
        v-else
        class="pos-rel"
        tabindex="0"
        style="float: right;top: 100px;margin-right: 10px !important;"
      >
        <buttonsubscribe v-bind:subCount="author.follow"></buttonsubscribe>
      </div>
      <div
        class="pos-rel"
        tabindex="0"
        style="float: right;top: 100px;margin-right: 10px !important;"
      >
        <buttontransfer v-bind:author="author"></buttontransfer>
      </div>
    </div>
  </div>
</template>

<script>
import buttontransfer from '../../../components/button/buttontransfer'
import buttonunsubscribe from "../../../components/button/buttonunsubscribe";
import buttonsubscribe from "../../../components/button/buttonsubscribe";
export default {
  props: {
    author: Object
  },
  data() {
    return {
      authorImg: {
        "background-size": "cover",
        float: "left",
        top: "10px",
        left: "20px",
        "min-width": "128px",
        width: "128px",
        height: "128px",
        "background-image":
          "url(" +
          (this.author && this.author.pic
            ? Meteor.settings.IPFS.file_base_url + this.author.pic
            : "/static/images/user.png") +
          ")"
      }
    };
  },
  components: {
    buttonunsubscribe,
    buttonsubscribe,
    buttontransfer
  },
  computed: {
    isSubscribedTo: function() {
      return false;
    },
    cover_image: function() {
      // console.log(this.author.cover_image)
      if (!this.author.cover_image) return this.randomBackgroundColor();
      else return "";
    }
  },
  methods: {
    randomBackgroundColor: function() {
      var rnd = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
      var bgcolor = "";
      switch (rnd) {
        case 1:
          bgcolor = "channelbga";
          break;
        case 2:
          bgcolor = "channelbgb";
          break;
        case 3:
          bgcolor = "channelbgc";
          break;
        case 4:
          bgcolor = "channelbgd";
          break;
        default:
          bgcolor = "channelbge";
      }
      return bgcolor;
    }
  }
  //     mainUser: function () {
  //   return Users.findOne({ username: Session.get('activeUsername') })
  // },
  // user: function () {
  //   return {
  //     name: FlowRouter.getParam("author")
  //   }
  // },
  // author: function () {
  //   return ChainUsers.findOne({ name: FlowRouter.getParam("author") })
  // },
  // activeUser: function () {
  //   return Session.get('activeUsername')
  // },
  // subCount: function () {
  //   return ChainUsers.findOne({ name: FlowRouter.getParam("author") }).followersCount || 0
  // }
};
</script>