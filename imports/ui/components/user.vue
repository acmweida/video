<template>
  <div>
    <Login v-if="loginState"></Login>
    <Person v-else></Person>
  </div>
</template>

<script>
import Login from "./login/login";
import Person from "./login/person";
export default {
  components: {
    Login,
    Person
  },
  meteor: {
    loginState() {
      var userinfo = Session.get("isLogin");
      if (!userinfo) {
           userinfo = JSON.parse(localStorage.getItem("isLogin").toString());
      }
       
      if (userinfo != undefined && userinfo.exist === true) return false;
      else return true;
    }
  }
};
</script>
