<template>
  <div class="videosnap wid-ful" style="max-width:248px;">
    <a v-bind:title="title"  :href="'/user/video/'+video.ipfs" target="_blank">
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
        <a  :href="'/user/video/'+video.ipfs" target="_blank">
          <span class="customtitlelink" style="margin-top: 10px;">{{title}}</span>
        </a>
      </div>
    </div>
    <div class="videosnapauthor">
      <a :href="'/user/c/'+username" target="_blank">
        <span class="customlink">{{username}}</span>
      </a>
    </div>
    <div class="videosnapdetails">
      <div class="videosnaprest">{{gratuityNum}} ETH</div>
      <div class="videosnaptime">{{date}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    video: Object
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
    player() {
      this.$router.replace("/user/video/" + this.video.ipfs);
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