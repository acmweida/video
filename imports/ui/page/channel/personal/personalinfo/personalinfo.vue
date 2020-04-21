<template>
  <div class="ui grid" style="max-width:600px;margin:auto;margin-top:10px;">
    <div class="ui form" style="width:100%">
      <div class="field">
        <label>用 户 名</label>
        <input type="text" name="account" v-model="account" maxlength="16" />
      </div>
      <div class="field">
        <label>签 名</label>
        <input type="text" name="last-name" :value="desc" />
      </div>
      <div class="field publicKey">
        <label>用 户 唯 一 标 识</label>
        <span>{{author._id}}</span>
      </div>
      <input type="button" class="ui button" value="Save"  v-on:click="save" />
    </div>
  </div>
</template>

<script>
import UploadUtil from "../../../../../util/UploadUtil";
import IpfsUtil from "../../../../../api/ipfs/ipfs";
import { User } from "../../../../collections/collection";
export default {
  props: {
    author: Object
  },
  meteor: {
    $subscribe: {
      user: []
    }
  },
  data() {
    return {
      account: this.author.account,
      desc: this.author.desc ? this.author.desc : translate("AUTHOR_DESC_NO")
    };
  },
  methods: {
    save: function() {
        console.log(this.account)
      if (
        !(this.account.trim().length >= 6 && this.account.trim().length <= 16)
      ) {
        toastr.error(
          translate("USERNAME_FORMAT_ERROR"),
          translate("ERROR_TITLE")
        );
        return;
      }
      var res = 0;
      if (this.desc == translate("AUTHOR_DESC_NO")) {
         res = User.update(
          { _id: this.author._id },
          { $set: { 'account': this.account } }
        );
      } else {
         res = User.update(
          { _id: this.author._id },
          { $set: { 'account': this.account, 'desc': this.desc } }
        );
      }
      if (res == 1 ) {
             toastr.success(translate("USER_INFO_CHANGE_SUCCESS"), translate("USERS_SUCCESS"));
             var newAuthor = User.findOne({_id:this.author._id});
             this.$emit("update:author",newAuthor);
             console.log(newAuthor)
      } else {
          toastr.error(translate("USER_INFO_CHANGE_FAILE"), translate("ERROR_TITLE"));
         
      }
    }
  }
};
</script>