<template>
  <div>
    <div class="ui indicating progress" id="progresssnap" style="display:none">
      <div class="bar"></div>
      <div class="label">{{ translate('UPLOAD_UPLOADING_SNAP')}}</div>
    </div>
    <UploadVideoProgress v-if="progressShow" v-bind:progess="progessvalue" v-bind:info="info"></UploadVideoProgress>
    <div class="modal">
      <div class="modal-content clearfix">
        <div class="img-clip-wrap">
          <div class="container-bg">
            <div class="img-container">
              <img id="clip_src_img" />
            </div>
          </div>
          <label for="file_input" class="first-change-lb">
            <i></i>
            <span>选择图片</span>
          </label>
          <form enctype="multipart/form-data" id="pictrueinfp">
            <input
              type="file"
              id="file_input"
              accept="image/png, image/jpg, image/jpeg"
              style="display: none;"
              v-on:change="doUploadSnap"
            />
          </form>
        </div>
        <div class="border-line" style="width:3px"></div>
        <div class="img-preview-wrap">
          <div class="pre-container" v-bind:style="img">
            <img id="clip_res_img" style="display: none;" />
          </div>
          <div class="pre-info">当前头像</div>
        </div>
      </div>
      <p class="descript">请选择图片上传：大小180 * 180像素支持JPG、PNG等格式，图片需小于2M</p>
      <div class="modal-footer" v-on:click="save">
        <button class="ui button" type="submit">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import UploadVideoProgress from "../../../upload/uploadvideoprogress/uploadvideoprogress";
import UploadUtil from "../../../../../util/UploadUtil";
import IpfsUtil from "../../../../../api/ipfs/ipfs";
import { User } from "../../../../collections/collection";
export default {
  props: {
    id: String,
    pic: String
  },
  components: {
    UploadVideoProgress
  },
  data() {
    return {
      progressShow: false,
      info: translate("UPLOAD_PIC"),
      progessvalue: 0,
      img: {
        "background-image":
          "url(" +
          (this.pic.startsWith("/")
            ? this.pic
            : Meteor.settings.IPFS.file_base_url + this.pic) +
          ")"
      }
    };
  },
  computed: {},
  meteor: {
    $subscribe: {
      user: []
    }
  },
  methods: {
    doUploadSnap: function(event) {
      console.log(event);
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
          Session.set("persionpicturehash", result.Hash);
          console.log("Uploaded picture", result);
        }
      };
      // var credentials = Session.get("upldr") == "cluster" ? true : false;
      let ajaxVideoUpload = UploadUtil.uploadFile(file, formData, cb);
      IpfsUtil.upFile(ajaxVideoUpload);

      //  new UploadUtil().uploadFile(file,formData,cb,xhr);
    },
    save: function() {
      const personalPictureHash = Session.get("persionpicturehash");
      if (!personalPictureHash) {
        toastr.info(translate("SNAP_MISSING_IMAGE"), translate("TIPS_TITLE"));
        return;
      }
      var res = User.update(
        { _id: this.id },
        { $set: { pic: personalPictureHash } }
      );
      console.log(res);
      if (res == 1) {
        toastr.success(
          translate("UPLOAD_PIC_SUCCESS"),
          translate("USERS_SUCCESS")
        );
      } else {
        toastr.error(translate("UPLOAD_PIC_FAILE"), translate("ERROR_TITLE"));
      }
    }
  }
};
</script>


<style scoped>
.modal-content {
  padding: 80px 20px 56px;
  display: inline-block;
}

.container-bg {
  width: 180px;
  height: 180px;
  background-color: #000;
  border-radius: 4px;
  border: 1px solid #e5e9ef;
}

.first-change-lb span {
  display: block;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #6d757a;
  line-height: 20px;
  margin-top: 10px;
  padding: 0 12px;
  letter-spacing: 0;
}

.first-change-lb i {
  margin: 52px auto 0;
  width: 54px;
  height: 46px;
  display: block;
  background: url(https://s1.hdslb.com/bfs/static/account-fe/static/img/icons_m_2.57e5263.png);
  background-position: -101px -1065px;
}
.modal {
  font: 12px/1.5 Microsoft YaHei, tahoma, \\5b8b\4f53, sans-serif;
  color: #717171;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  margin: 0;
  padding: 0;
  width: 830px;
  text-align: center;
}

.img-clip-wrap {
  font: 12px/1.5 Microsoft YaHei, tahoma, \\5b8b\4f53, sans-serif;
  color: #717171;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  text-align: center;
  margin: 0;
  padding: 0;
  float: left;
  position: relative;
  margin-right: 40px;
}

.img-container .shadow-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  -webkit-box-direction: normal;
  font: 12px/1.5 Microsoft YaHei, tahoma, \\5b8b\4f53, sans-serif;
  color: #717171;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  text-align: center;
  box-sizing: inherit;
}

.crop-wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  cursor: crosshair;
  -webkit-box-direction: normal;
  font: 12px/1.5 Microsoft YaHei, tahoma, \\5b8b\4f53, sans-serif;
  color: #717171;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  text-align: center;
  box-sizing: inherit;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  cursor: crosshair;
}

.shadow-box,
.shadow-img {
  position: absolute;
  top: 0;
  left: 0;
}

.shadow-box {
  overflow: hidden;
  z-index: 1;
}

.shadow-box,
.shadow-img {
  position: absolute;
  top: 0;
  left: 0;
}

.point-lt {
  top: -10px;
  left: -10px;
  cursor: nw-resize;
}

.drag-point {
  display: inline-block;
  width: 10px;
  height: 10px;
  border: 1px solid #fff;
  position: absolute;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.point-lb {
  left: -10px;
  bottom: -10px;
  cursor: sw-resize;
}

.point-rt {
  right: -10px;
  top: -10px;
  cursor: ne-resize;
}

.point-rb {
  right: -10px;
  bottom: -10px;
  cursor: se-resize;
}

.first-change-lb {
  color: #717171;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  text-align: center;
  margin: 0;
  padding: 0;
  cursor: pointer;
  background: #f1f2f5;
  width: 180px;
  height: 180px;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid #e5e9ef;
  border-radius: 4px;
  transition: all 0.6s ease;
}
.reset-img {
  position: absolute;
  bottom: -28px;
  left: 50%;
  -webkit-transform: translate(-50%);
  transform: translate(-50%);
}

.border-line {
  height: 182px;
  width: 1px;
  background: #e5e9ef;
  float: left;
}

.img-preview-wrap {
  margin-left: 40px;
  margin-top: 30px;
  float: left;
}

.pre-container {
  width: 96px;
  height: 96px;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid #e6eaf0;
  background-size: cover;
}

.pre-info {
  margin-top: 20px;
  font-size: 12px;
  color: #99a2aa;
}

.descript {
  line-height: 16px;
  color: #99a2aa;
}

.modal-footer {
  text-align: center;
  margin-top: 40px;
}
</style>