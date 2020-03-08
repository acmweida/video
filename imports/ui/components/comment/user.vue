<template>
  <div class="nav-user-center">
    <div class="user-con search-icon">
      <a href="//search.bilibili.com/" target="_blank">
        <i class="bilifont bili-icon_dingdao_sousuo"></i>
      </a>
    </div>
    <Login v-if="!loginState" ></Login>
    <Singin v-else></Singin>
    <Upload></Upload>
  </div>
</template>

<script>
import Upload from './upload'
import Login from './login/login'
import Singin from './login/singin'
export default {
  data() {
    return {
      isLogin: false
    };
  },
  components: {
    Upload,
    Login,
    Singin
  },
  methods:{
    
  },
  meteor:{
    loginState() {
        if (Session.get("isLogin") === undefined ) {
          Session.set("isLogin",false); 
        }  else {
          this.isLogin = Session.get("isLogin");
        }
        return this.isLogin;
    }
  }
};
</script>
