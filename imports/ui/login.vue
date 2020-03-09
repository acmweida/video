<template>
  <div id="login-app">
    <div data-v-0c98c25d class="login-app bottom-filling">
      <div data-v-0c98c25d>
        <div data-v-0c98c25d class="top-banner"></div>
        <div data-v-0c98c25d class="title-line">
          <span class="tit">登录</span>
        </div>
        <div data-v-0c98c25d class="login-box clearfix">
          <div data-v-0c98c25d class="login-right">
            <div data-v-0c98c25d class="form-login">
              <div id="geetest-wrap" class="input-box">
                <div>
                  <div style>
                    <div class="item username status-box">
                      <input
                        type="text"
                        value
                        placeholder="你的账号"
                        id="login-username"
                        maxlength="50"
                        autocomplete="off"
                        class
                        v-model="eth_account"
                      />
                      <span class="status"></span>
                      <div class="text clearfix">
                        <p class="tips"></p>
                      </div>
                      <!---->
                    </div>
                    <div class="item password status-box">
                      <input
                        type="password"
                        placeholder="密码"
                        v-model="password"
                        id="login-passwd"
                        class
                      />
                      <span class="status"></span>
                      <div class="text clearfix">
                        <p v-if="loginError" class="tips">账号或密码错误</p>
                      </div>
                    </div>
                    <!---->
                    <div class="item gc clearfix">
                      <!---->
                    </div>
                  </div>
                  <div class="btn-box" v-on:click="login">
                    <a class="btn btn-login">登录</a>
                  </div>
                  <!---->
                </div>
              </div>
              <!---->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Global from '../setting/setting'
export default {
  data() {
    return {
      eth_account: "",
      password: "",
      loginError: false
    };
  },
  methods: {
    login: function() {
      console.log(this.eth_account);
      console.log(this.password);
      if (
        this.eth_account.trim().length > 0 &&
        this.eth_account.trim().length > 0
      ) {
        Meteor.call(
          "user.login",
          {
            eth_account: this.eth_account,
            password: this.password
          },
          (err, res) => {
            console.log(res);
            if (err) {
              alert(err);
            } else {
              if (res.exist) {
                Session.set("isLogin",true);
                Session.set("user",res.user);
                Session.set(Global.content,Global.contentType.Home);
              } else {
                 this.loginError = true;
              }
            }
          }
        );
      }
    }
  }
};
</script>

<style scoped>
* {
  font-family: "PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif";
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  margin: 0;
  padding: 0;
}

.top-banner {
  background: #00a0d8;
  height: 90px;
  text-align: center;
  margin-bottom: 20px;
  background-color: white;
}

.title-line {
  width: 980px;
  height: 28px;
  margin: 0 auto;
  border-bottom: 1px solid #ddd;
  margin-bottom: 60px;
  text-align: center;
}

.title-line .tit {
  height: 56px;
  line-height: 56px;
  margin: 0 auto;
  padding: 0 20px;
  font-size: 40px;
  background: #fff;
  text-align: center;
}

.login-box {
  position: relative;
  width: 980px;
  margin: 0 auto;
  justify-content: center;
  display: flex;
}

.clearfix:after {
  display: block;
  content: "";
  clear: both;
}

.login-box .login-right {
  padding-left: 45px;
  width: 490px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.form-login .input-box {
  margin-top: 50px;
  width: 414px;
}

.status-box {
  position: relative;
}

.form-login .input-box .item input {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 2px;
  color: #aaa;
  font-size: 14px;
  padding: 10px;
  height: 60px;
  vertical-align: middle;
  border-radius: 4px;
}

.status-box .status {
  display: none;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAABgCAYAAABLwH3pAAAAGXRFW…ICIAgKgCAoAIKgAAiCAiAICoAgKACCoAAIggIgiFmE/wswAJ4FV7zvyrR7AAAAAElFTkSuQmCC);
  position: absolute;
  top: 8px;
  right: -25px;
  width: 20px;
  height: 20px;
}

.form-login .input-box .text {
  margin: 6px 0;
  font-size: 12px;
  min-height: 20px;
  line-height: 20px;
}

.clearfix:after {
  display: block;
  content: "";
  clear: both;
}

.form-login .input-box .remember {
  margin: 10px 0;
  color: #717171;
  width: 410px;
  font-size: 12px;
}
.remember-tool {
  color: #717171;
  font-size: 12px;
  font-family: "PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif";
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  margin: 0;
  padding: 0;
  -webkit-box-pack: justify;
  justify-content: space-between;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

.form-login .input-box .btn-box {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -moz-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-align-content: center;
  -ms-flex-line-pack: center;
  align-content: center;
}

.form-login .input-box .btn-box .btn-login {
  border: 1px solid #0381aa;
  color: #fff;
  background-color: #00a7de;
}

.form-login .input-box .btn-box .btn {
  color: #555;
  display: inline-block;
  height: 45px;
  border: 1px solid #ccc;
  border-radius: 2px;
  width: 184px;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  margin: auto;
}
</style>