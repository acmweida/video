<template>
  <div class="ui inverted segment">
    <div class="ui inverted secondary menu">
      <a class="item left" style="margin-left:40px;font-size:24px">视频分享平台后台管理系统</a>
      <a class="item"> {{admin.username}}</a>
      <a class="item" @click="logout">退出</a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    admin: Object
  },
  methods: {
    logout: function() {
      console.log("xxxx");
      Session.set("admin", null);
      sessionStorage.setItem("admin", null);
      this.$router.replace("/admin");
    }
  }
};
</script>

<style scoped>
li {
  height: 64px;
}

.layout-nav {
  width: 210px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>