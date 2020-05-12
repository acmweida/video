<template>
  <div class="right floated menu">
    <div v-on:click="toChannel" class="ui item top right floated dropdown dropdownnotification">
      <img alt style="width:32px;height:32px;" src="/static/images/nouser.png" />
    </div>
    <div
      v-on:click="toActive"
      class="ui item top right floated dropdown dropdownnotification"
      tabindex="0"
    >
      <h4 class="dtubesidebartitle trendingtitle" style="font-size:1.3em; margin:0;">动态</h4>
    </div>
    <div
      v-on:click="logout"
      class="ui item top right floated dropdown dropdownnotification"
      tabindex="0"
    >
      <h4 class="dtubesidebartitle trendingtitle" style="font-size:1.3em; margin:0;">退出</h4>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toChannel() {
      var user = Session.get("isLogin");
      if (!user) {
           user = JSON.parse(localStorage.getItem("isLogin").toString());
      }
      this.$router.push("/user/c/" + user.user.account);
    },
    toActive() {
       var user = Session.get("isLogin");
       if (user) {
         user = JSON.parse(localStorage.getItem("isLogin").toString());
       }
      this.$router.push("/user/a/" + user.user.account);
    },
    logout() {
      localStorage.setItem("isLogin", null);
      Session.set('isLogin',null);
    }
  }
};
</script>

<style scoped>
h4 {
  color: white;
}
</style>