<template>
  <div class="right floated menu">
    <div class="ui item top right floated dropdown dropdownnotification">
      <img alt style="width:32px;height:32px;" src="/static/images/nouser.png" />
    </div>

    <div class="ui item top right floated dropdown dropdownnotification" tabindex="0">
      <!-- <i id="notification" class="alarm icon" style="font-size:1.3em; margin:0;"></i> -->
      <router-link :to="{ name: 'login' }" >
      <h4 class="dtubesidebartitle trendingtitle" style="font-size:1.3em; margin:0;">登录</h4>
      </router-link>
    </div>
    <div
      class="ui item top right floated dropdown dropdownsettings needsclick"
      style="float: right;"
      tabindex="0"
    >
      <router-link :to="{ name: 'register' }" >
      <h4 class="dtubesidebartitle trendingtitle" style="font-size:1.3em; margin:0;">注册</h4>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
h4 {
  color: white;
}
</style>