<template>
  <div>
    <Login v-if="loginState"></Login>
    <Singin v-else></Singin>
  </div>
</template>

<script>
import Login from "./login/login";
import Singin from "./login/singin";
export default {
  components: {
    Login,
    Singin
  },
  meteor: {
    loginState() {
      var userinfo = Session.get("isLogin");
      if (userinfo != undefined && userinfo.exist === true) return false;
      else return true;
    }
  }
};
</script>
