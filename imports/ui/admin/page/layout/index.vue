
<template>
  <div class="layout">
    <!-- <Layout>/ -->
      <Header v-bind:admin="admin"></Header>
      <!-- </Layout> -->
      <div class="ui bottom attached segment pushable">
        <div class="ui visible inverted left vertical sidebar menu">
           <div class="item">
              <div class="header h">内容管理</div>
              <div class="menu h">
                <a class="item h">视频审核</a>
                <a class="item h">评论审核</a>
              </div>
            </div>
            <div class="item">
              <div class="header">人员管理</div>
              <div class="menu">
                <a class="item">用户管理</a>
              </div>
            </div>
            <div class="item">
              <div class="header">权限管理</div>
              <div class="menu">
                <a class="item">权限管理</a>
                <a class="item">角色管理</a>
              </div>
            </div>
            <div class="item">
              <div class="menu">
                <a class="item">我的账号</a>
              </div>
            </div>
        </div>
        <div class="pusher">
          <div class="ui basic segment" >
             <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </div>
        </div>
      </div>
    <!-- </Layout> -->
  
  </div>
</template>
<script>
import Header from "../../compoents/top";
export default {
  components: {
    Header
  },
  created() {
    // var admin = JSON.parse(localStorage.getItem("admin").toString());
    var admin = Session.get("admin");
    if (!admin) {
      this.$router.replace("/admin/login");
    }
  },
  computed: {
    admin: function() {
      return Session.get("admin");
    }
  }
};
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  margin: auto;
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

.h {
  height: 64px;
}
</style>