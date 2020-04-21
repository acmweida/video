<template>
  <div>
    <div class="ui top attached tabular menu" style="margin-top: 0rem;display:inline-block;">
      <a
        class="item basics active"
        style="display:inline-block;"
        data-tab="first"
      >{{ UPLOAD_BASICS}}</a>
    </div>
    <div
      class="ui bottom attached tab segment active"
      data-tab="first"
      style="margin:auto;padding-left: 1px;padding-right:1px;border-width: 0px;background: transparent;"
    >
      <div id="infozone" style="text-align:left;">
        <form class="ui form uploadform">
          <div class="field">
            <label>{{ UPLOAD_TITLE }}</label>
            <input id="uploadTitle" type="text" name="title" v-bind:placeholder="UPLOAD_TITLE" />
          </div>
          <div class="field">
            <label>{{ UPLOAD_DESCRIPTION }}</label>
            <textarea id="uploadDescription" rows="4" name="description" v-model="description"></textarea>
          </div>
          <div class="field">
            <label>{{ UPLOAD_TAGS}}</label>
            <select
              id="tagDropdown"
              name="skills"
              class="ui fluid search dropdown"
              v-model="selected"
            >
              <option disabled value>请选择</option>
              <option v-for="tag in  topTags" v-bind:key="tag" v-bind:value="tag">{{tag}}</option>
            </select>
          </div>
        </form>
      </div>
    </div>
    <button
      class="ui red right labeled dtube icon button uploadsubmit"
      type="button"
      style="margin-bottom:10px;"
    >
      <div style="display:inline-block;padding: 0.8em 1em;" v-on:click="upload">{{ UPLOAD_SUBMIT }}</div>
    </button>
    <div v-on:click="saveInfo" id="saveinfo" />
  </div>
</template>

<script>
import "../../../../util/translate";
import WEB3Util from "../../../../api/eth/web3";
import VideoCreateLog from '../../../collections/collection'
export default {
  data() {
    return {
      VIDEO_EDIT: "编辑",
      UPLOAD_SUBMIT: "提交",
      UPLOAD_BASICS: "Basics",
      UPLOAD_DESCRIPTION: "视屏详情",
      UPLOAD_TAGS: "标签",
      description: "",
      topTags: ["生活", "游戏"],
      selected: "",
      UPLOAD_TITLE: "题目"
    };
  },
  meteor:{
    videolog:[]
  },
  watch: {
    title: function(oldvalue, newvalue) {
      Session.set("title", newvalue);
    }
  },
  methods: {
    saveInfo: function() {
      const user = Session.get("isLogin");
      const publickey = user.user.publicKey;
      console.log("address:" + publickey);
      const videoHash = Session.get("videoHash");
      const pictureHash = Session.get("picturehash");
      const title = $('input[name="title"]').val();
      const resid = Session.get("resid");

      Meteor.call(
        "video.create",
        {
          publicKey: publickey,
          ipfs: videoHash,
          resid: resid,
          title: title,
          cover: pictureHash,
          description: this.description,
          kind: this.selected
        },
        function(err, res) {
          if (err) {
            alert(err);
          } else {
            if (res) {
              toastr.success(
                translate("TORRENT_CONGRATZ"),
                translate("USERS_SUCCESS")
              );
            } else {
              toastr.error(
                translate("TORRENT_FAILE"),
                translate("ERROR_TITLE")
              );
            }
          }
        }
      );
    },
    upload: function() {
      // const title = ;
      // console.log(title);
      const pictureHash = Session.get("picturehash");
      if (!pictureHash) {
        toastr.info(translate("SNAP_MISSING_IMAGE"), translate("TIPS_TITLE"));
        return;
      }

      ///////////////////////////////////////////////////////////////////////////////////
      // 记录hash到以太坊
      //////////////////////////////////////////////////////////////

      const address = Session.get("user.address");
      const videoHash = Session.get("videoHash");
      // const pictureHash = Session.get("picturehash");
      const title = $('input[name="title"]').val();
      callback = function(err,res) {
        console.log(err);
        console.log(res);
        if (err) {    receipt
          alert(err);
        } else {
          var _resid = res.resId;
          if (_resid == "0x00000000000000000000000000000000") {
            toastr.error(
              translate("UPLOAD_ERROR_SUBMIT_BLOCKCHAIN"),
              translate("ERROR_TITLE")
            );
          } else {
            toastr.success(
              translate("UPLOAD_COMPLETE_SUBMIT_BLOCKCHAIN"),
              translate("USERS_SUCCESS")
            );
            Session.set("resid", _resid);
            VideoCreateLog.insert(res.receipt);
            $("#saveinfo").click();
          }
        }
      };
      WEB3Util.createVideo(address, videoHash, [], pictureHash, title, callback);
      //  WEB3Util.insertResource("0x1",address, videoHash, [], pictureHash, title, callback);
    }
  }
};
</script>

