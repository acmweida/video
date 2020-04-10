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
                <div class="videopayout">{{videoinfo.gratuityNum}} DTC</div>
              </div>
              <div
                class="ui left tiny circular avatar floated image"
                v-bind:style="userImg"
              ></div>

              <div class="channelLink" style="margin-top:10px;">
                <a v-bind:href="'/user/'+authorInfo.publicKey">{{authorInfo.account}}</a>
              </div>

              <a href="https://d.tube/login/dtube">
                <div class="ui red dtube button subscribe" tabindex="0">
                  <div style="display:inline-block; padding: 0.8em 1em;">订阅</div>
                  <div class="ui label btnlabel">61</div>
                </div>
              </a>

              <span class="donateButton" style="margin-left: 10px">
                <button class="ui icon grey button transferdtcbtn pos-rel">
                  <!-- <i class="icon ion-gift" ></i> -->
                  <ion-icon name="gift-outline" style="color: black;font-size:20px"></ion-icon>
                </button>
                <!-- Send DTC Modal -->
                <div
                  class="ui small modal transferdtc"
                  style="z-index:1001; position: fixed; top:50%; left:50%; transform: translate(-50%, -50%)"
                >
                  <div class="header" style="border-bottom: 0">
                    Sending DTC to hauptmann
                    <img
                      class="ui avatar image"
                      src="./AGAIN A YEAR JUST WENT BY SO FAST _ D.tube talk#258 - DTube_files/saved_resource"
                    />
                  </div>
                  <div class="content">
                    <form class="ui large form wid-ful">
                      <div class="ui segments">
                        <div class="ui segment" style="padding: 20px;">
                          <div class="field">
                            <label>Amount</label>
                            <div class="ui left icon input">
                              <i class="calculator icon"></i>
                              <input
                                type="number"
                                min="0.01"
                                step="0.01"
                                id="transfer_amount"
                                value="1"
                              />
                            </div>
                          </div>
                          <div class="field">
                            <label>Memo</label>
                            <div class="ui left icon input">
                              <i class="pencil icon"></i>
                              <input type="text" id="transfer_memo" value />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="actions">
                    <div
                      id="confirmTransfer"
                      class="ui right labeled icon button red dtube pos-rel"
                    >
                      <div style="display:inline-block;padding: 0.8em 1em;">Confirm</div>
                      <i class="icon check red" style="background:white;opacity:1;"></i>
                      <i
                        class="icon white loading spinner dsp-non"
                        style="background-color: transparent;opacity:1;"
                      ></i>
                    </div>
                    <div
                      id="cancelTransfer"
                      class="ui right labeled icon button grey dtube pos-rel"
                    >
                      <div style="display:inline-block;padding: 0.8em 1em;">Cancel</div>
                      <i class="icon x" style="background:white;opacity:1;"></i>
                    </div>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
        <div id="editvideosegment" class="ui segment" style="display: none">
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
            <strong title="4 个月前">Published on 2019年12月18日</strong>
            <br />Hi
            <a href="http://d.tube/" target="_blank" rel="noopener noreferrer">D.tube</a> family.
            <br />2 days left and I will start my holidays and will be off from work until 2020.
            <br />Not a full recap of 2019 today but some highlights to mention already before.
            <br />Thank you for watching, have a wonderful day.
            <br />
            <br />Greetings from Barcelona
          </div>
        </div>

        <div class="ui segment description" style="text-align: center; padding:0px; margin:0px;">
          <div id="showmore" style="text-align: center;">
            <button class="ui button videoshowmore">更多</button>
            <i class="ui icon angle down"></i>
          </div>
          <div id="showless" class="hidden" style="text-align: center;">
            <button class="ui button videoshowmore">减少</button>
            <i class="ui icon angle up"></i>
          </div>
        </div>

        <!-- Related Videos Mobile -->

        <!-- Comments - Reply -->
        <div class="ui secondary segment" style="background: #f5f5f5;">
          <h3 class="ui header">1 回复</h3>

          <div style="text-align: center; padding:10px;">
            <a href="https://d.tube/login">
              <h5>您需要登录才能发表评论!</h5>
            </a>
          </div>

          <div class="ui threaded comments" style="max-width: 9999px;">
            <div class="ui fluid">
              <div class="title comment" style="text-align:left; padding-bottom: 1em;">
                <div class="ui comment" style="max-width: 9999px;">
                  <a
                    class="ui mini circular avatar image"
                    style="margin-right:10px; width:48px; height:48px;"
                  >
                    <div
                      style="background-size: cover; min-width:48px; width:48px; height: 48px; background-image:url(https://steemitimages.com/u/hafizullah/avatar/)"
                    ></div>
                  </a>

                  <a href="https://d.tube/c/hafizullah" class="ui author">hafizullah</a>

                  <div class="metadata">
                    <a class="date" href="https://d.tube/v/hafizullah/q2pjrg">4 个月前</a>
                    <span class="money">$0</span>
                  </div>
                  <div
                    class="text"
                    style="word-wrap: normal; flex-wrap: wrap; overflow: hidden; margin-top: 10px;"
                  >
                    <a href="https://d.tube/c/tipu" target="_blank" rel="noopener noreferrer">@tipu</a> curate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Related videos  -->

    <div class="pdg-5 relatedcol four computer only wide column">
      <div class="ui grid videorecommendedcomputer" style="margin-right: -5rem;">
        <h3>相关视频</h3>

        <div class="verticalvideoband wid-ful">
          <a
            href="https://d.tube/v/hauptmann/oP4-Y2RSRGQ"
            title="WHERE WE ARE PLANNING TO GO NEXT YEAR | D.tube talk#249"
          >
            <div class="verticalvideosnap wid-ful dsp-flx">
              <div class="pos-rel" style="min-width: 160px; height:90px; float: left;">
                <div class="verticalvideosnapsnap" style="height:90px;">
                  <div
                    id="snapload"
                    class="ui active dimmer snaploader pos-abs"
                    style="z-index:-1; background-color: rgba(167, 167, 167, 0.85); float: left; height:90px; width: 160px;"
                  >
                    <i class="icon photo nosnap" style="font-size:28px; margin-top:15%;"></i>
                    <div class="ui text nosnap" style="margin-top:10px;">缺少图片</div>
                  </div>
                  <span class="videoscore">
                    <i class="thumbs up icon"></i>5.5M
                  </span>

                  <span class="videosnapduration">06:13</span>

                  <img
                    id="snapimg"
                    height="90"
                    width="160"
                    alt
                    data-src="https://snap1.d.tube/ipfs/QmNjFs84UDro1agLUt7YhrCQD2xZAje9dzMJUjvAqENgfq"
                    src="./AGAIN A YEAR JUST WENT BY SO FAST _ D.tube talk#258 - DTube_files/QmNjFs84UDro1agLUt7YhrCQD2xZAje9dzMJUjvAqENgfq"
                    class="transition visible"
                    style="display: inline !important;"
                  />
                  <br />
                </div>
              </div>
              <div class="pos-rel" style="text-align:left; margin-left:8px;">
                <div class="boxdisplayer">
                  <div class="verticalvideosnaptitle">
                    <a href="https://d.tube/v/hauptmann/oP4-Y2RSRGQ">
                      <span
                        class="customtitlelink"
                      >WHERE WE ARE PLANNING TO GO NEXT YEAR | D.tube talk#249</span>
                    </a>
                  </div>
                </div>
                <div class="videosnapauthor">
                  <a href="https://d.tube/c/hauptmann">
                    <span class="customlink">hauptmann</span>
                  </a>
                </div>
                <div class="videosnapdetails">
                  <div class="videosnaprest">553.26 DTC</div>
                  <div class="videosnaptime">5 个月前</div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import play from "../../components/comment/video/player";
export default {
  data() {
    return {};
  },
  computed: {
    userImg:function() {
      return {
        'margin-top': '4px',
        'background-size': 'cover',
        'min-width':'64px',
        width:'64px',
        height: '64px',
        'background-image':'url('+ (this.authorInfo && this.authorInfo.pic ? Meteor.settings.IPFS.file_base_url+this.authorInfo.pic : "/static/images/user.png") +")"
      }
    }
  },
  created() {
    this.fetchVideoData();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchVideoData"
  },
  components: {
    play
  },
  meteor: {
    // videoUrl:function() {
    //   // var videoinfo = +;
    //   return Meteor.settings.IPFS.file_base_url+Session.get(this.$route.params.id).ipfs;
    // },
    videoinfo: function() {
      return Session.get(this.$route.params.id);
    },
    authorInfo: function() {
      console.log(Session.get("author"))
      return Session.get("author");
    }
  },
  methods: {
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
            Session.set("author", res.authorinfo);
            Session.set(ipfs, res.videoinfo);
          }
        }
      );
    }
  }
};
</script>
