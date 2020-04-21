<template>
  <div class="pusher">
    <div class="article">
      <main class="ui maingrid content">
        <div
          id="videouploadsteps"
          class="ui uploadpage"
          style="width: 100%;max-width:900px;margin: auto;"
        >
          <div
            class="ui segment brd-rad-non"
            style="margin:20px 0px;padding:30px;padding-left: 100px;
    padding-right: 100px;
    padding-top: 30px;
    padding-bottom: 30px;"
          >
            <!-- <div  class="ui indicating progress" id="progressvideo" style="display:none"   >
              <div class="bar"></div>
              <div class="label">{{ UPLOAD_UPLOADING_VIDEO}}</div>
            </div>-->
            <div class="ui indicating progress" id="progresssnap" style="display:none">
              <div class="bar"></div>
              <div class="label">{{UPLOAD_UPLOADING_SNAP}}</div>
            </div>
            <UploadVideoProgress
              v-if="progressShow"
              v-bind:progess="progessvalue"
              v-bind:info="info"
            ></UploadVideoProgress>
            <!-- OLD SCHOOL AND COMPLEX UPLOAD -->
            <center>
              <br />
              <div
                v-on:click="upload"
                id="dropzone"
                class="dropzone needsclick"
                style="height:360px !important;max-width:420px  !important"
              >
                <div class="needsclick">
                  <img style="width:90px;height:90px" src="/static/images/upload.png" />
                  <h2>{{ UPLOAD_UPLOAD_FILE}}</h2>
                </div>
              </div>
              <form enctype="multipart/form-data" id="fileinfp">
                <input
                  type="file"
                  name="fileToUpload"
                  v-on:click="uploadFile"
                  v-on:change="toUpload"
                  id="fileToUpload"
                  style="display: none;"
                />
              </form>
            </center>

            <div id="uploadDetails" style="display: none">
              <div id="previewzone">
                <div class="ui grid" style="margin-left: 0cm;">
                  <div class="one column row">
                    <div class="column">
                      <video
                        id="videopreview"
                        class="dsp-non wid-ful"
                        controls
                        autoplay
                        style="height: 100%;"
                      ></video>
                      <canvas id="snappreview" class="dsp-non" style="display: none"></canvas>
                    </div>
                  </div>
                </div>

                <div
                  v-on:click="downloadsnap"
                  style="text-align:right; margin-top:30px; margin-bottom:40px;"
                >
                  <a
                    class="ui icon right labeled dtube grey button"
                    id="snap"
                    download="snap.jpg"
                    style="margin-right: 10px!important; margin-top:10px;padding-left: 0em !important;"
                  >
                    <div style="display:inline-block; padding:0.8em 1em;">{{ UPLOAD_TAKE_SNAP}}</div>
                    <i class="photo icon black" style="background:white; opacity:1;"></i>
                  </a>
                  <label for="snapFile">
                    <a
                      class="ui red dtube icon right labeled button"
                      style=" margin-top:10px;"
                      id="uploadSnap"
                    >
                      <div style="display:inline-block; padding:0.8em 1em;">{{ UPLOAD_UPLOAD_SNAP}}</div>
                      <i class="cloud upload icon red" style="background:white; opacity:1;"></i>
                    </a>
                  </label>
                  <form enctype="multipart/form-data" id="pictrueinfp">
                    <input
                      type="file"
                      id="snapFile"
                      style="display: none;"
                      v-on:click="uploadsnap"
                      v-on:change="doUploadSnap"
                    />
                  </form>
                </div>
              </div>
              <UploadFilefrom></UploadFilefrom>
            </div>
            <!-- <div v-if="tempContent">
              <button
                class="ui fluid red right labeled dtube icon button uploadsubmit"
                type="button"
                style="margin-bottom:10px;"
              >
                <div
                  style="display:inline-block;padding: 0.8em 1em;"
                  v-on:click="publish"
                >PUBLISH VIDEO</div>
                 <i class="fire icon red" style="background: white;opacity: 1;"></i> -->
                <!-- <i
                  class="icon white loading spinner dsp-non"
                  style="background-color: transparent;opacity:1;"
                ></i>
              </button> -->
            <!-- </div> --> 
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import UploadFilefrom from "./uploadfileform/uploadfileform";
import UploadVideoProgress from "./uploadvideoprogress/uploadvideoprogress";
import UploadUtil from "../../../util/UploadUtil";
import "../../../util/translate";
import IpfsUtil from "../../../api/ipfs/ipfs";
import WEB3Util from "../../../api/eth/web3"
export default {
  data() {
    return {
      UPLOAD_UPLOADING_VIDEO: "上传视频",
      UPLOAD_UPLOADING_SNAP: "上传截图",
      UPLOAD_UPLOAD_FILE: "选择一个视频进行上载",
      UPLOAD_TAKE_SNAP: "截图",
      UPLOAD_UPLOAD_SNAP: "上载截图",
      tempContent: false,
      progressShow: false,
      propressType: 0,
      progessvalue: 0
    };
  },
  components: {
    UploadFilefrom,
    UploadVideoProgress
  },
  created: function() {
    var userinfo = Session.get("isLogin");
    if (userinfo && userinfo.exist === true);
    else this.$router.replace("/login");
  },
  computed: {
    // tempContent: function() {
    //   return Session.get("tempContent");
    // },
    info: function() {
      if (this.propressType == 0) {
        return this.UPLOAD_UPLOADING_VIDEO;
      }
      return this.UPLOAD_UPLOADING_SNAP;
    },
    activeUsername: function() {
      return Session.get("activeUsername");
    }
  },
  methods: {
    upload: function() {
      $("#fileToUpload").click();
    },
    uploadFile: function() {
      //    const ipfsClient = Npm.require('ipfs-http-client');
      this.$emit("uploadFile");
    },
    uploadsnap: function() {
      //    const ipfsClient = Npm.require('ipfs-http-client');
      this.$emit("uploadsnap");
    },
    toUpload: function(event) {
      this.propressType = 0;
      dt = event.target;
      $("#uploadLinkForm").hide();
      $("#uploadDetails").show();
      this.tempContent = true;
      if (!dt.files || dt.files.length == 0) {
        toastr.error(
          translate("UPLOAD_ERROR_UPLOAD_FILE"),
          translate("ERROR_TITLE")
        );
        return;
      }
      var file = dt.files[0];
      if (file.type.split("/")[0] != "video") {
        toastr.error(
          translate("UPLOAD_ERROR_WRONG_FORMAT"),
          translate("ERROR_TITLE")
        );
        return;
      }

      $("#videopreview").removeClass("dsp-non");
      $("#snappreview").removeClass("dsp-non");
      $("#dropzone").hide();
      this.tempContent = true;
      $('input[name="title"]').val(
        file.name.substring(0, file.name.lastIndexOf("."))
      );

      // displaying the preview
      var videoNode = document.querySelector("video");
      var fileURL = URL.createObjectURL(file);
      videoNode.addEventListener("durationchange", function() {
        if (videoNode.readyState) {
          $('input[name="duration"]').val(videoNode.duration);
        }
      });
      videoNode.src = fileURL;
      this.progressShow = true;
      /**
       * 文件上传
       */
      /////////////////////////////////////////////////////////////////////////////////
      let formData = new FormData(document.getElementById("fileinfp"));

      cb = function(err, result) {
        if (err) {
          this.progressShow = false;
          this.progress = 0;
          toastr.error(err, "上载时出现IPFS错误");
          return;
        } else {
          toastr.success("視頻传成功", "成功");
          Session.set("videoHash", result.Hash);
          console.log("Uploaded video", result);
        }
      };
      let ajaxVideoUpload = UploadUtil.uploadFile(file, formData, cb);
      IpfsUtil.upFile(ajaxVideoUpload);
    },
    doUploadSnap: function(event) {
      console.log(event);
      this.propressType = 1;
      var file = event.target.files[0];
      var ValidImageTypes = ["image/gif", "image/jpeg", "image/png"];
      console.log(file);
      if (file.type.split("/")[0] != "image") {
        toastr.error(
          translate("UPLOAD_ERROR_NOT_IMAGE"),
          translate("ERROR_TITLE")
        );
        return;
      }
      if (file.size > Session.get("remoteSettings").snapMaxFileSizeKB * 1000) {
        toastr.error(
          translate("UPLOAD_ERROR_REACH_MAX_SIZE") +
            " " +
            Session.get("remoteSettings").snapMaxFileSizeKB +
            " KB",
          translate("ERROR_TITLE")
        );
        return;
      }

      /**
       * 文件上传
       */
      ///////////////////////////////////////////////////////////////////////////////////
      this.progressShow = true;
      let formData = new FormData(document.getElementById("pictrueinfp"));

      cb = function(err, result) {
        if (err) {
          this.progressShow = false;
          this.progress = 0;
          toastr.error(err, "上载截图时出现IPFS错误");
          return;
        } else {
          toastr.success("图片上传成功", "成功");
          Session.set("picturehash", result.Hash);
          console.log("Uploaded picture", result);
        }
      };
      // var credentials = Session.get("upldr") == "cluster" ? true : false;
      let ajaxVideoUpload = UploadUtil.uploadFile(file, formData, cb);
      IpfsUtil.upFile(ajaxVideoUpload);

      //  new UploadUtil().uploadFile(file,formData,cb,xhr);
    },
    downloadsnap: function(event) {
      // console.log(event);
      var video = document.querySelector("video");
      var canvas = document.querySelector("canvas");
      var context = canvas.getContext("2d");
      var w, h, ratio;

      // Calculate the ratio of the video's width to height
      ratio = video.videoWidth / video.videoHeight;
      // Define the required width as 100 pixels smaller than the actual video's width
      w = video.videoWidth - 100;
      // Calculate the height based on the video's width and the ratio
      h = parseInt(w / ratio, 10);
      // Set the canvas width and height to the values just calculated
      canvas.width = w;
      canvas.height = h;

      // Define the size of the rectangle that will be filled (basically the entire element)
      context.fillRect(0, 0, w, h);
      // Grab the image from the video
      context.drawImage(video, 0, 0, w, h);
      // Save snap to disk
      var dt = canvas.toDataURL("image/jpeg");
      $("#snap").attr("href", dt);
    },
    publish: function() {
      var resid = Session.get("resid");
      if (!resid) {
        toastr.info(translate("UPLOAD_FIRST"), translate("TIPS_TITLE"));
        return;
      }

      if (typeof web3 != "undefined") {
        web3 = new Web3(web3.currentProvider);
      } else {
        web3 = new Web3(
          new Web3.providers.HttpProvider(Meteor.settings.eth.address)
        );
      }

      console.log(address);
      callback = function(err,res) {
        console.log(err);
        console.log(res);
        if (err) {
          alert(err);
        } else {
          if (res) {
             toastr.success(
              translate("TORENT_PUBLISH_COMPETE"),
              translate("USERS_SUCCESS")
            );
          } else {
             toastr.error(
              translate("TORENT_PUBLISH_FAILE"),
              translate("ERROR_TITLE")
            );
          }
        }
      }
      WEB3Util.changeResourceWaive(address,true,callback);
    }
  }
};
</script>
