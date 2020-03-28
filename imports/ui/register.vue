<template>
  <div>
    <div data-v-0c98c25d class="top-banner"></div>
    <div class="title-line">
      <span class="tit">注册</span>
    </div>
    <div class="ui grid" style="max-width:600px;margin:auto;margin-top:60px;">
      <form class="ui large form wid-ful">
        <div class="ui segments">
          <div class="ui segment" style="padding: 20px;">
            <div class="field">
              <div class="ui left icon input">
                <input
                  v-model="account"
                  type="text"
                  name="username"
                  placeholder="用户名(长度大于等于6小于等于18)"
                />
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <input v-model="email" type="text" name="email" placeholder="邮箱" />
              </div>
            </div>
            <!-- <div class="field">
              <div class="ui left icon input">
                <input v-model="email" type="text" name="password" placeholder="密码：用于" />
              </div>
            </div>-->
            <div clas="field">
              <div style="color:red;">
                <p>{{emailError}}</p>
              </div>
            </div>
            <div id="loginbutton" class="ui fluid labeled small button" tabindex="0">
              <button
                type="button"
                v-on:click="register"
                class="ui fluid red right labeled dtube icon submit button"
              >
                <div style="display:inline-block;padding: 0.8em 1em;">注册</div>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Globle from "../setting/setting";
import DeployUser from "../api/eth/abi/DeployUser";
import BigNumber from "bignumber";
import EthUtil from "ethereumjs-util";
import Web3 from "Web3";
// import Wallet from 'ethereumjs-wallet'

const ERROR_INFO = {
  emailFormatError: "邮箱格式错误",
  emailExist: "邮箱已注册",
  passworFormatError: "用户名格式错误"
};

export default {
  data() {
    return {
      email: "",
      account: "",
      emailError: " "
    };
  },
  methods: {
    login: function() {
      Session.set(Globle.content, Globle.contentType.Login);
    },
    register: function() {
      // // console.log("xxxx");
      var emailRegix = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      var res = emailRegix.test(this.email);
      if (!res) {
        this.emailError = ERROR_INFO.emailFormatError;
        return;
      }
      if (
        !(this.account.trim().length >= 6 && this.account.trim().length <= 16)
      ) {
        this.emailError = ERROR_INFO.passworFormatError;
        return;
      }

      /*
        检查Email是否以注册
      */
      /*
        注册
    //  */
      var hasRegister;
      Meteor.call(
        "user.hasRegister",
        {
          email: this.email
        },
        function(err, res) {
          console.log(res);
          hasRegister = res;
          //return res; //hasRegister = res;
        }
      );

      //console.log(hasRegister);
      if (hasRegister) {
        this.emailError = ERROR_INFO.emailExist;
        return;
      }

      //   this.emailError = " ";

      if (typeof web3 != "undefined") {
        web3 = new Web3(web3.currentProvider);
      } else {
        web3 = new Web3(
          new Web3.providers.HttpProvider(Meteor.settings.eth.address)
        );
      }

      // var newAccount = web3Util.createAccount();
      var newAccount = web3.eth.accounts.create(web3.utils.randomHex(32));
      // console.log(newAccount);

      // let privatekey = new Buffer( newAccount.privateKey,'hex');
      let publicKey = EthUtil.privateToPublic(
        EthUtil.toBuffer(newAccount.privateKey)
      );
      //  let publicKey = EthUtil.privateToPublic(EthUtil.toBuffer("0xa1b6bedba8993ee1a03fb15003538986f42f08b8ff243e1def94aa3b76adf5ef"));
      // console.log(newAccount.privateKey.length)
      // console.log(publicKey.toString('hex'));

      let publicKeyString = publicKey.toString("hex");
      // console.log(publicKeyString)
      /**
       * todo:邮箱发送
       */

      Meteor.call(
        "user.register",
        {
          account: this.account,
          publicKey: publicKeyString,
          email: this.email
        },
        function(err, res) {
          if (res) {
            Session.set("isLogin", res.user);
            let address = EthUtil.pubToAddress(publicKey).toString("hex");
            Session.set("user.address", address);
            return;
          }
          // console.log(res);
          // console.log(err);
          toastr.error(
            '注册失败,请联系管理员',
            '错误'
          );
          return;
        }
      );
       var userinfo = Session.get('isLogin');
        if ( userinfo.exist ) {
          // console.log("sss")
          this.$router.replace("/");
        }
       
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