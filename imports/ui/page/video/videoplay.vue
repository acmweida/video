<template >
  <div class="ui videocontainer stackable two column grid computergrid">
    <!-- Player on page -->
    <div v-if="videoinfo" class="videocol twelve wide column" style="padding:0px!important">
      <div style="position: relative">
        <div class="mirrors" style="display: none;"></div>
      </div>

      <div class="ui embed player active">
        <play v-bind:video="videoinfo"></play>
      </div>

      <div
        v-if="videoinfo"
        class="ui segments"
        style="display:flow-root; padding: 0px; margin: 0px;"
      >
        <!-- Title, Vote - Share - More  -->
        <div
          class="ui segment"
          style="padding-right: 0px !important; padding-bottom: 0px !important;"
        >
          <div class="ui info" style="display: inline-grid; width: 100%;">
            <div class="videotitlecontainer">
              <h1 class="videotitle">{{videoinfo.title}}</h1>
            </div>
            <div style="display:inline-block;">
              <div
                id="videosnaptags"
                class="videosnaptags pos-rel"
                style="bottom: 5px; float:left; max-width: 48%;"
              >
                <a href="#" class="ui small label">{{videoinfo.kind}}</a>
              </div>
            </div>
          </div>
        </div>
        <!-- Author Info (image and name) - Suscribe - Edit - Payout   -->
        <div v-if="authorInfo" class="ui segment" style="padding:0px!important;">
          <div class="details wid-ful">
            <div class="videoleftdetails wid-ful" style="padding: 10px;">
              <div class="videorightdetails">
                <div class="videopayout">{{videoinfo.gratuityNum}} ETH</div>
              </div>
              <div class="ui left tiny circular avatar floated image" v-bind:style="userImg"></div>

              <div v-on:click="toChannel" class="channelLink" style="margin-top:10px;">
                <a >{{authorInfo.account}}</a>
              </div>

              <div v-on:click="subscript" class="ui red dtube button subscribe" tabindex="0">
                <div
                  style="display:inline-block; padding: 0.8em 1em;"
                >{{ translate("VIDEO_SUBSCRIBE")}}</div>
                <div class="ui label btnlabel">{{ authorInfo.follow}}</div>
              </div>

              <span class="donateButton" style="margin-left: 10px" v-on:click="transfer">
                <button class="ui icon grey button transferdtcbtn pos-rel">
                  <i class="icon gift" style="color: white;"></i>
                </button>
             
              </span>
            </div>
          </div>
        </div>
           <buttontransfersmall v-if="authorInfo && videoinfo" v-bind:author="authorInfo" v-bind:video="videoinfo" ></buttontransfersmall>
        <div v-if="isAuthor" id="editvideosegment" class="ui segment" style="display: none">
          <div
            class="ui bottom attached tab segment active"
            data-tab="first"
            style="margin:auto; padding-left: 1px; padding-right:1px; border-width: 0px; background: transparent;"
          >
            <div id="infozone" style="text-align:left;">
              <form class="ui form uploadform">
                <div class="field">
                  <label>题目</label>
                  <input id="uploadTitle" type="text" name="title" placeholder="题目" />
                </div>
                <div class="field">
                  <label>视屏详情</label>
                  <textarea id="uploadDescription" rows="4" name="description"></textarea>
                </div>
              </form>
            </div>
          </div>

          <button
            class="ui red right labeled dtube icon button editsubmit"
            type="button"
            style="float:right; margin-bottom: 10px"
          >
            <div style="display:inline-block; padding: 0.8em 1em;">编辑</div>
            <i class="checkmark icon red" style="background: white;opacity: 1;"></i>
            <i
              class="icon white loading spinner dsp-non"
              style="background-color: transparent;opacity:1;"
            ></i>
          </button>
        </div>

        <!-- Syntaxed video description - Show More -->
        <div
          id="descriptionsegment"
          class="ui segment closed descriptionsegment wid-ful"
          style="display:grid; overflow: hidden;"
        >
          <div id="truncateddesc" class="truncate" style="overflow: hidden;">
            <strong title="4 个月前">Published on {{ dateFrom(videoinfo.createDate,true)}}</strong>
            <br />
            {{ videoinfo.description }}
          </div>
        </div>

        <!-- Related Videos Mobile -->

        <!-- Comments - Reply -->
        <div class="ui secondary segment" style="background: #f5f5f5;">
          <h3 class="ui header">1 回复</h3>

          <div v-if="isLogin" style="text-align: center; padding:10px;">
            <a href="/login">
              <h5>您需要登录才能发表评论!</h5>
            </a>
          </div>
          <div v-else class="wid-ful dsp-flx">
            <!-- <div style="text-align:left;float:left;">
                <div class="ui avatar mini image"
                  style="background-size:cover; margin-top:10px; min-width:48px; width:48px; height: 48px; background-image:url({{userPic activeUser 'small'}})">
                </div>
                <div class="ui author" style="margin-top:5px;margin-right:10px;font-weight: 600;">{{activeUser}}</div>
            </div> CANT HAVE THAT WITH 2 LOGGED IN USERS ?-->
            <form class="ui reply form wid-ful">
              <div class="field pos-rel wid-ful" style="display: inline-block;vertical-align: top;">
                <textarea id="replytext" rows="3"></textarea>
              </div>
              <div
                class="ui blue right labeled icon submit button dtube pos-rel"
                style="float:right;vertical-align: top;"
              >
                <i class="ui blue icon remove repl dsp-non" style="background:white;opacity:1;"></i>
                <i class="ui blue icon load repl dsp-non" style="background:white;opacity:1;">
                  <div class="ui active loader"></div>
                </i>
                <!-- <i class="ui blue right icon repl talk iconloader on" style="background:white;"></i> -->
                <div style="display:inline-block;padding: 0.8em 1em;">{{ translate("VIDEO_ADD_COMMENT")}}</div>
              </div>
            </form>
          </div>
          <comments></comments>
        </div>
      </div>
    </div>
    <!-- Related videos  -->

    <div class="pdg-5 relatedcol four computer only wide column">
      <div class="ui grid videorecommendedcomputer" style="margin-right: -5rem;">
        <h3>{{ translate('VIDEO_RELATED_VIDEOS')}}</h3>

        <div class="verticalvideoband wid-ful">
          <verticalvideoband></verticalvideoband>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import play from "../../components/video/player";
import buttontransfersmall from "../../components/buttontransfersmall";
import comments from "./comments/comments";
import verticalvideoband from "../../components/video/verticalvideoband";
import "../../../util/Util";
export default {
  data() {
    return {
      isAuthor: false
    };
  },
  computed: {
    userImg: function() {
      return {
        "margin-top": "4px",
        "background-size": "cover",
        "min-width": "64px",
        width: "64px",
        height: "64px",
        "background-image":
          "url(" +
          (this.authorInfo && this.authorInfo.pic
            ? Meteor.settings.IPFS.file_base_url + this.authorInfo.pic
            : "/static/images/user.png") +
          ")"
      };
    }
  },
  mounted: function() {
    this.fetchVideoData();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchVideoData"
  },
  components: {
    play,
    buttontransfersmall,
    comments,
    verticalvideoband
  },
  meteor: {
    videoinfo: function() {
      return Session.get(this.$route.params.id);
    },
    authorInfo: function() {
      // console.log(Session.get("author"));
      return Session.get("author");
    },
    isLogin: function() {
      console.log(Session.get("isLogin"));
      return !(Session.get("isLogin") && Session.get("isLogin").exist
        ? true
        : false);
    }
  },
  methods: {
    toChannel:function() {
        this.$router.push('/c/'+this.authorInfo.account);
    },
    subscript: function() {},
    transfer:function() {
      console.log("transfer")
      $('.transferdtc').show();
    },
    fetchVideoData: function() {
      var ipfs = this.$route.params.id;
      Meteor.call(
        "videoPlay.selectOne",
        {
          ipfs: ipfs
        },
        function(err, res) {
          console.log(res);
          if (err) {
            alert(err);
          } else {
            console.log(res.authorinfo);
            Session.set("author", res.authorinfo);
            Session.set(ipfs, res.videoinfo);
          }
        }
      );
    }
  }
};
</script>
