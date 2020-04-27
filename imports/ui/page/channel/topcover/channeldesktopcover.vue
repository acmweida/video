<template name='channeldesktopcover'>
  <div id="channelcover" class="channelcover" v-bind:class="cover_image">
    <img
      v-if="authorinfo.cover_image"
      v-bind:src="authorinfo.cover_image"
      class="pos-abs"
      style="object-fit: cover;width: 100%;height: 100%;"
    />
    <div class="ui container">
      <div
        class="pos-abs"
        style="margin-left:160px;;top:20%;z-index:10;color:white;text-shadow: 2px 2px 2px #262626;"
      >
        <h1>{{authorinfo.account}}</h1>
        <i class="icon red play"></i>
        <strong>{{ authorinfo.gratuityNum ? authorinfo.gratuityNum : 0 }} ETH</strong>
        <br />
        <div style="margin-top:15px">
          <strong>{{authorinfo.desc ? authorinfo.desc : translate("AUTHOR_DESC_NO")}}</strong>
        </div>
      </div>
      <div class="ui image circular" v-bind:style="authorImg"></div>

      <div v-if="!isAuthor">
        <div
          v-if="isSubscribedTo"
          class="pos-rel"
          tabindex="0"
          style="float: right;top: 100px;margin-right: 10px !important;"
        >
          <buttonunsubscribe v-on:cancelSub="cancelSub" v-bind:subCount="authorinfo.follow"></buttonunsubscribe>
        </div>
        <div
          v-else
          class="pos-rel"
          tabindex="0"
          style="float: right;top: 100px;margin-right: 10px !important;"
        >
          <buttonsubscribe v-on:addSub="addSub" v-bind:subCount="authorinfo.follow"></buttonsubscribe>
        </div>
        <div
          class="pos-rel"
          tabindex="0"
          style="float: right;top: 100px;margin-right: 10px !important;"
        >
          <buttontransfer v-bind:author="authorinfo"></buttontransfer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import buttontransfer from "../../../components/button/buttontransfer";
import buttonunsubscribe from "../../../components/button/buttonunsubscribe";
import buttonsubscribe from "../../../components/button/buttonsubscribe";
import { User,Sub } from "../../../collections/collection";
export default {
  props: {
    author: Object
  },
  meteor: {
    $subscribe: {
      user: [],
      sub:[]
    }
  },
  data() {
    return {
         user:null,
      authorinfo:this.author,
      subinfo:null,
      isSubscribedTo:false,
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
          (this.authorinfo && this.authorinfo.pic
            ? Meteor.settings.IPFS.file_base_url + this.authorinfo.pic
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
  created() {
         this.authorinfo = this.author;
        var user = Session.get("isLogin");
        console.log(user)
        this.user = user;
        if (user) {
           var userSub = Sub.findOne({userid:this.user.publicKey});
           this.userSub = userSub;
        }
        this.isSubscribedTo = !this.user || !this.userSub || (this.userSub && this.userSub.subs.indexOf(this.authorinfo.publicKey) == -1) ? false : true;
  },
  computed: {
    // isSubscribedTo: function() {
    //   // if (!this.user) {
    //   //   return false;
    //   // }
    //   // // console.log(this.userSub)
    //   // if (!this.userSub ) {
    //   //   return false;
    //   // }
    //   // // console.log(this.userSub.subs.indexOf(this.author.publicKey));
    //   // if (this.userSub && this.userSub && this.userSub.subs.indexOf(this.authorinfo.publicKey) == -1) {
    //   //  return false;
    //   // } 
    //   return 
    // },
    cover_image: function() {
      // console.log(this.author.cover_image)
      if (!this.authorinfo.cover_image) return this.randomBackgroundColor();
      else return "";
    },
    isAuthor: function() {
      if (!this.authorinfo) return false;
      // var user = Session.get("isLogin");
      // console.log(this.author);
      // var res = {};
      return this.user && this.user.user.publicKey == this.authorinfo.publicKey;
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
    },
    cancelSub: function() {
      console.log("xxxx");
      // console.log(user);
      if (!this.user) {
        this.$router.replace("/login");
      }
      // var subinfo = Sub.findOne({userid:user.publicKey});
      Sub.update({_id:this.userSub._id},{$pull:{subs:this.authorinfo.publicKey}});
      User.update({_id:this.authorinfo._id},{$inc:{follow:-1}})
      this.authorinfo = User.findOne({_id:this.authorinfo._id});
      this.isSubscribedTo = !this.isSubscribedTo;
    },
    addSub: function() {
      console.log("xxxx");
      // console.log(user);
  
      if (!this.user) {
        this.$router.replace("/login");
        return ;
      }
    
      if (this.userSub) {
        Sub.update({_id:this.userSub._id},{ $push: { subs: this.authorinfo.publicKey }});
      } else {
        Sub.insert({userid:this.user.publicKey,subs:[this.authorinfo.publicKey]});
      }
        User.update({_id:this.authorinfo._id},{$inc:{follow:1}})
        this.authorinfo = User.findOne({_id:this.authorinfo._id});
        this.isSubscribedTo = !this.isSubscribedTo;
    }
  }
};
</script>