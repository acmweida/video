<template>
  <div
    class="ui item top right floated dropdown dropdownsettings needsclick"
    style="float: center; width:140px;"
    tabindex="0"
    v-on:click="change"
  >
    <h5 style="font-size:24px;margin: 0 auto;">投稿</h5>
  </div>
</template>

<script>
export default {
  methods: {
    change: function() {
      // var userinfo = Session.get("isLogin");
        var userinfo = JSON.parse(localStorage.getItem("isLogin").toString());
      if (userinfo && userinfo.exist === true)
        this.$router.replace("/user/upload");
      else this.$router.replace("/user/login");
    }
  }
};
</script>

<style scoped>
h5 {
  color: white;
}
</style>