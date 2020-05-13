<template>
  <div class="right floated menu">
    <div class="ui item top right floated dropdown dropdownnotification" tabindex="0">
      <!-- <i id="notification" class="alarm icon" style="font-size:1.3em; margin:0;"></i> -->
      <router-link :to="{ name: 'home2' }" exact>
        <h4 class="dtubesidebartitle trendingtitle" style="font-size:1.3em; margin:0;">主页</h4>
      </router-link>
    </div>
    <div class="ui item top right floated dropdown dropdownnotification" tabindex="0">
      <!-- <i id="notification" class="alarm icon" style="font-size:1.3em; margin:0;"></i> -->
      <router-link :to="{ name:'newvideo'}">
        <h4 class="dtubesidebartitle trendingtitle" style="font-size:1.3em; margin:0;">新短片</h4>
      </router-link>
    </div>

    <div class="ui item top right floated dropdown dropdownnotification" tabindex="0">
      <!-- <i id="notification" class="alarm icon" style="font-size:1.3em; margin:0;"></i> -->
      <router-link :to="{ name: 'trendingvideo' }">
        <h4 class="dtubesidebartitle trendingtitle" style="font-size:1.3em; margin:0;">潮流短片</h4>
      </router-link>
    </div>
    <div
      class="ui item top right floated dropdown dropdownsettings needsclick"
      style="float: right;"
      tabindex="0"
    >
      <router-link :to="{ name: 'hotvideo' }">
        <h4 class="dtubesidebartitle trendingtitle" style="font-size:1.3em; margin:0;">热门短片</h4>
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
