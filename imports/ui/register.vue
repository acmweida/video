<template>
  <div id="app" class="bottom-filling">
    <div>
      <div class="top-banner"></div>
      <div class="title-line">
        <span class="tit" style="font-size: 38px;">注册</span>
      </div>
      <div class="register-container">
        <form id="registerForm" method="post" onsubmit="return false;" class="report-wrap-module">
          <div class="form-group">
            <div class="el-input">
              <input
                type="text"
                autocomplete="off"
                placeholder="邮箱"
                class="el-input__inner"
                v-model="email"
              />
            </div>
            <p class="error-message">{{ emailError }}</p>
          </div>
          <div class="register-hidden-gruop">
            <div class="safe_window" style="display: none;">
              <!-- <p>安全系数</p>
              <div class="a_pw"></div>-->
            </div>
          </div>
          <div class="form-group">
            <div class="el-input">
              <input
                v-model="password"
                type="password"
                autocomplete="off"
                placeholder="密码（6-16个字符组成，区分大小写）"
                class="el-input__inner"
              />
            </div>
            <p class="error-message"></p>
          </div>
          <div class="form-group register-hidden-gruop text-right"></div>
          <div class="form-group">
            <button
              v-on:click="register"
              type="button"
              class="el-button btn-full el-button--primary"
            >
              <span>注册</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Globle from "../setting/setting";
import DeployUser from "../api/eth/abi/DeployUser";
import Web3 from "Web3";

const ERROR_INFO = {
  emailFormatError: "邮箱格式错误",
  emailExist: "邮箱已注册",
  passworFormatError: "密码格式错误"
};

export default {
  data() {
    return {
      email: "",
      password: "",
      emailError: ""
    };
  },
  methods: {
    login: function() {
      Session.set(Globle.content, Globle.contentType.Login);
    },
    register: function() {
      // // console.log("xxxx");
      // var emailRegix = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      // var res = emailRegix.test(this.email);
      // if (!res) {
      //   this.emailError = ERROR_INFO.emailFormatError;
      //   return;
      // }
      // if (
      //   !(this.password.trim().length >= 6 && this.password.trim().length <= 16)
      // ) {
      //   this.emailError = ERROR_INFO.passworFormatError;
      //   return;
      // }
      /*
        检查Email是否以注册
      */
      /*
        注册
     */
      // console.log(web3);
      if (typeof web3 != "undefined") {
        web3 = new Web3(web3.currentProvider);
      } else {
        web3 = new Web3(
          new Web3.providers.HttpProvider(Meteor.settings.eth.address)
        );
      }

      console.log(web3.version);
      // web3.eth.getAccounts().then(console.log);
      
      // console.log(web3.version);
      Meteor.call(
        "user.register",
         {
            eth_account: this.email,
            password: this.password
        },
         (err, res) => {
          console.log(res); 
          console.log(err);
      });
    }
  }
};
</script>

<style scoped>
.bottom-filling:after {
  height: 38px;
  display: block;
  content: "";
}

.international-header,
.van-popover {
  font: 14px -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial,
    PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
  position: relative;
  z-index: 1000;
  margin: 0;
  padding: 0;
}

.top-banner {
  background: #00a0d8;
  height: 56px;
  text-align: center;
  margin-bottom: 60px;
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
.register-container {
  width: 980px;
  margin: 0 auto;
  padding: 60px 0;
}

.form-desc,
.form-group {
  width: 420px;
  margin: 0 auto;
  font-size: 12px;
  position: relative;
}

* {
  font-family: "PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif";
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}

.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}

.error-message {
  color: #f45d90;
  position: absolute;
  right: -20px;
  top: 12px;
  -webkit-transform: translate3d(100%, 0, 0);
  -moz-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
  font-size: 12px;
}

.el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 60px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}

.register-hidden-gruop {
  width: 420px;
  height: 40px;
  margin: 0 auto;
}

.form-desc,
.form-group {
  width: 420px;
  margin: 0 auto;
  font-size: 12px;
  position: relative;
}

#app .el-button--primary {
  color: #fff;
  background-color: #00a1d6;
  border-color: #00a1d6;
}

.el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}

/* #app .el-button.is-disabled,
#app .el-button.is-disabled:focus,
#app .el-button.is-disabled:hover {
  color: rgba(0, 0, 0, 0.25);
  background-color: #f5f5f5;
  border-color: #d9d9d9;
} */

.el-button {
  font-family: "PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif";
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  background: #fff;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  /* cursor: not-allowed; */
  background-image: none;
  width: 100%;
  height: 40px;
  color: rgba(0, 0, 0, 0.25);
  background-color: #f5f5f5;
  border-color: #d9d9d9;
}

.register-hidden-gruop.text-right {
  line-height: 40px;
  text-align: right;
}

.register-hidden-gruop {
  width: 420px;
  height: 40px;
  margin: 0 auto;
}

a {
  color: #00a1d6;
}
</style>