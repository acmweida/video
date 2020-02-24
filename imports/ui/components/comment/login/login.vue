<template>
  <div class="user-con logout">
    <div class="item">
      <div data-v-106692e2 v-on:click="changeLogin">
        <span data-v-106692e2>
          <div
            data-v-106692e2
            class="mini-login van-popover__reference"
            aria-describedby="van-popover-7400"
            tabindex="0"
          >
            <span data-v-106692e2 class="name">
              <img data-v-106692e2 src="/static/images/nouser.png" class="logout-face" />
              登录
            </span>
          </div>
        </span>
      </div>
    </div>
    <div class="item" v-on:click="changeRegister">
      <a class="txt name">注册</a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    changeLogin() {
      // console.log(Session.get("contentType"));
      Session.set("contentType", "Login");
    },
    changeRegister() {
      Session.set("contentType", "Register");
    }
  }
};
</script>