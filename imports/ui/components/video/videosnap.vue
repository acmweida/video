<template name='videosnap'>
  <div class="videosnap wid-ful" style="max-width:248px;">
    <a v-bind:title="title" :href="'/video/'+video.ipfs" target="_blank">
      <div id="snaphover" class="videosnapsnap wid-ful" style="height:118px;">
        <div class="pos-abs wid-ful" style="z-index:1; height:118px;">
          <span class="videoscore">
            <i class="icon ion-thumbsup"></i>
            {{thumbsup}}
          </span>

          <div
            id="watchlater"
            class="addwatchlater snapbutton right floated pos-abs dsp-non"
            title="Watch later"
            style="float: right; right: 5px; background: black; top: 5px; border-radius: 4px; opacity: 0.9; z-index:999;"
          >
            <i class="time icon" style="padding: 0px; color:white; margin: 8px; font-size: 1.2em;">
              <span style="z-index:9000;"></span>
            </i>
          </div>

          <div
            id="snapload"
            class="ui snaploader pos-abs wid-ful loaded"
            style="z-index:-1; background-color: rgba(167, 167, 167, 0.85); height:118px; display: block; text-align: center;"
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
            height="100%"
            style="max-height:118px;"
            alt
          />
        </div>
        <br />
      </div>
    </a>
    <div class="boxdisplayer">
      <div class="videosnaptitle">
        <a :href="/video/+video.ipfs" target="_blank">
          <span class="customtitlelink" style="margin-top: 10px;">{{title}}</span>
        </a>
      </div>
    </div>
    <div class="videosnapauthor">
      <a target="_blank" :href="/c/+username">
        <span class="customlink">{{username}}</span>
      </a>
    </div>
    <div class="videosnapdetails">
      <div class="videosnaprest">{{gratuityNum}} ETH</div>
      <div class="videosnaptime">{{date}}</div>
    </div>
    <div v-if="isAuthor">
      <div
        v-if="!video.waive"
        v-on:click="upVideo"
        class="ui right labeled icon button green transferdtcbtn pos-rel"
        style="margin-top: 5px;"
      >
        <div style="display:inline-block;padding: 0.2em;">{{ translate('VIDEO_UP')}}</div>
      </div>
      <div
        v-else
        v-on:click="downVideo"
        class="ui right labeled icon button red transferdtcbtn pos-rel"
        style="margin-top: 5px;"
      >
        <div style="display:inline-block;padding: 0.2em;">{{ translate('VIDEO_DOWN')}}</div>
      </div>
      <div
        class="ui right labeled icon button grey transferdtcbtn pos-rel"
        style="margin-top: 5px;"
      >
        <div style="display:inline-block;padding: 0.2em;">{{ translate('VIDEO_EDIT')}}</div>
      </div>
    </div>
    <div id="changWaive" v-on:click="changeWaive" ></div>
  </div>
</template>

<script>
import WEB3Util from "../../../api/eth/web3";
import { Video} from '../../collections/collection'
export default {
  props: {
    video: Object,
    isAuthor: Boolean
  },
  data() {
    return {
      thumbsup: numForm(this.video.thumbsup),
      imgUrl: Meteor.settings.IPFS.file_base_url + this.video.cover,
      title: this.video.title,
      author: this.video.author,
      userUrl: "/c/" + this.video.author,
      gratuityNum: numForm(this.video.gratuityNum),
      date: this.dateFrom(new Date(this.video.createDate))
    };
  },
  meteor: {
    $subscribe: {
      video: []
    },
    username() {
      var username = Session.get("username" + this.video.author);
      Session.set(this.video.ipfs, this.video);
      if (!username) {
        return "...";
      }
      return username;
    },
    getUserName() {
      var author = this.video.author;
      Meteor.call(
        "user.getUserName",
        {
          publicKey: author
        },
        function(err, res) {
          if (err) {
            alert(err);
          } else {
            Session.set("username" + author, res);
          }
        }
      );
    }
  },
  methods: {
    upVideo: function() {
      let address = Session.get("user.address");
      let _resid = this.video.resid;
      let waive = true;
      cb = function(err, res) {
        console.log(err);
        console.log(res);
         if (res) {
            Session.set("waive",waive);
           $('#changWaive').click();
        }
      };
      WEB3Util.changeResourceWaive(address, _resid, waive, cb);
    },
    downVideo: function() {
      let address = Session.get("user.address");
      let _resid = this.video.resid;
      console.log(_resid)
      let waive = false;
      cb = function(err, res) {
        console.log(err);
        console.log(res);
        if (res) {
          Session.set("waive",waive);
         $('#changWaive').click();
        }
      };
      WEB3Util.changeResourceWaive(address, _resid, waive, cb);
    },
    changeWaive() {
      let waive = Session.get("waive");
        console.log(waive)
        Video.update({_id:this.video._id},{$set:{waive:waive}});
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
</style>