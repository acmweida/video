
<template>
  <div class="layout">
    <Layout>
      <Header v-bind:admin="admin"></Header>
      <Layout>
        <Sider>
          <Menu theme="dark" active-name="1">
            <MenuItem name="1" style="width:200px;  text-align: center;line-height: 32px;" >
            <Icon type="ios-home-outline" size="20"  />首页
            </MenuItem>
            <MenuItem name="2" style="width:200px;text-align: center;line-height: 32px;">
              <Icon type="md-chatbubbles"  />评论管理
            </MenuItem>
          </Menu>
        </Sider>
        <Layout :style="{padding: '24px 24px 24px 24px'}">
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">Content</Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import Header from '../../compoents/top'
export default {
  components:{
    Header
  },
  created() {
    // var admin = JSON.parse(localStorage.getItem("admin").toString());
   var admin =  Session.get('admin');
   if (!admin) {
     this.$router.replace("/admin");
   }
  },
  computed:{
    admin:function() {
      return Session.get('admin');
    }
  }

};
</script>

<style >
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  margin: auto;
}

li {
  height: 64px;
}



.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 250px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>