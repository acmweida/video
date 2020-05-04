<template>
  <Header style="height:64px">
    <Menu v-if="admin" mode="horizontal" theme="dark" active-name="1">
      <MenuItem name="1000" style="background-color:#495060" > <strong style="font-size:32px"> 视频分享后台管理系统 </strong></MenuItem>
      <div class="layout-nav">
        <MenuItem name="3">
          <Icon type="ios-contact"  />{{admin.username}}
        </MenuItem>
        <MenuItem name="4"  @click.native="logout">
         <Icon type="ios-exit" />  退出
        </MenuItem>
      </div>
    </Menu>
  </Header>
</template>
<script>
export default {
    props:{
      admin:Object
    },
    methods:{
      logout:function() {
        console.log("xxxx")
        Session.set('admin',null);
        sessionStorage.setItem('admin',null);
        this.$router.replace("/admin");
      }
    }
};
</script>