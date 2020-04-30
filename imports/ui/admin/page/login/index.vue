<template>
  <div class="ui middle aligned center aligned grid">
  <div class="column">
    <h2 class="ui teal image header">
      <img src="/static/images/video.png" class="image">
      <div class="content">
        视频分享平台后台管理系统
      </div>
    </h2>
    <form class="ui large form">
      <div class="ui stacked segment">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text"  v-model="email" placeholder="E-mail address">
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" v-model="password" placeholder="Password">
          </div>
        </div>
        <div class="ui fluid large teal submit button" v-on:click="login" >Login</div>
      </div>

      <div class="ui error message"></div>

    </form>

    
  </div>
</div>
</template>

<script>
import {Admin} from '../../../collections/collection'
export default {
  data() {
    return {
      email:"",
      password:""
    }
  },
  methods:{
    login:function() {
       var remail = this.email.replace(/\s/g, "");
       var password = this.password.replace(/\s/g,"");
       if (remail.length < 0 || remail.length < 0 ) {
         return ;
       }
       var emailRegix = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      var res = emailRegix.test(remail);
      if (!res) {
        toastr.error(translate("EMAIL_FORMAT_ERROR"),translate("ERROR_TITLE"))
        return ;
      }
     var admin =  Admin.findOne({email:remail,password:password});
    //  console.log(admin)
     if (!admin) {
       toastr.error(translate('LOGIN_ERROR'),translate("ERROR_TITLE"));
       return ;
     }
     sessionStorage.setItem('admin',admin);
     this.$router.push("/admin/main");
    }
  },
  meteor:{
    $subscribe: {
      admin: []
    },
  }
}
</script>

<style scoped>
  body {
      background-color: #DADADA;
    }
    body > .grid {
      height: 100%;
    }
    .image {
      margin-top: -100px;
    }
    .column {
      max-width: 450px;
    }
</style>