<template>
  <div class="ui middle aligned center aligned grid">
    <div class="column">
      <h2 class="ui teal image header">
        <img src="/static/images/video.png" class="image" />
        <div class="content">视频分享后台管理系统</div>
      </h2>
      <form class="ui large form">
        <div class="ui stacked segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" v-model="username" placeholder="Username" />
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" v-model="password" placeholder="Password" />
            </div>
          </div>
          <div v-on:click="login" class="ui fluid large teal submit button">Login</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Admin } from "../../../collections/collection";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  meteor: {
    $subscribe: {
      admin: []
    }
  },
  methods: {
    login() {
      var username = this.username.replace(/\s/g, "");
      var password = this.password.replace(/\s/g, "");

      if (username.length == 0 || password.length == 0) {
          toastr.error(translate("LOGIN_LENGTH_ERROR"),translate("ERROR_TITLE"));
          return ;
      }

       var admin =  Admin.findOne({username:username,password:password});
       if (!admin) {
           toastr.error(translate("LOGIN_ERROR"),translate("ERROR_TITLE"));
           return ;
       } 
       sessionStorage.setItem("admin",admin);
       Session.set('admin',admin);
       this.$router.push("/admin/main");
     }
  }
};
</script>

<style type="text/css" scoped>
body > .grid {
  height: 100%;
}
.image {
  margin-top: -100px;
}
.column {
  margin-top: 200px;
  max-width: 600px;
}
</style>