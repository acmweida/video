<template>
  <div>
    <div data-v-0c98c25d class="top-banner"></div>
    <div class="title-line">
      <span class="tit">登录</span>
    </div>
    <div class="ui grid" style="max-width:600px;margin:auto;margin-top:60px;">
      <form class="ui large form wid-ful">
        <div class="ui segments">
          <div class="ui segment" style="padding: 20px;">
            <div class="field">
              <div class="ui left icon input">
                <input v-model="email" type="text" name="username" placeholder="邮箱" />
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <input v-model="privatekey" type="password" name="privatekey" placeholder="私钥" />
              </div>
            </div>
            <div clas="field">
              <div style="color:red;" v-if="loginError">账号或私钥不存在</div>
            </div>
            <!-- <div class="field">
              <div class="ui slider checkbox">
                <input type="checkbox" name="rememberme" />
                <label class="text">记得我</label>
              </div>
            </div>-->
            <div id="loginbutton" class="ui fluid labeled small button" tabindex="0">
              <button
                type="button"
                v-on:click="login"
                class="ui fluid red right labeled dtube icon submit button"
              >
                <div style="display:inline-block;padding: 0.8em 1em;">登录</div>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Global from "../setting/setting";
import BigNumber from "bignumber";
import EthUtil from "ethereumjs-util";
import Web3 from "Web3";

export default {
  data() {
    return {
      email: "",
      privatekey: "",
      loginError: false
    };
  },
  methods: {
    login: function() {
      // console.log(this.eth_account);
      // console.log(this.privatekey);
      var remail = this.email.replace(/\s/g, "");
      var rprivatekey = this.privatekey.replace(/\s/g, "");


      if (rprivatekey.length == 64) {
        if (typeof web3 != "undefined") {
          web3 = new Web3(web3.currentProvider);
        } else {
          web3 = new Web3(
            new Web3.providers.HttpProvider(Meteor.settings.eth.address)
          );
        }

        let publicKey = EthUtil.privateToPublic(new Buffer(rprivatekey, "hex"));
        let publicKeyString = publicKey.toString("hex");

   //     console.log(publicKeyString);

        Meteor.call(
          "user.login",
          {
            email: remail,
            publicKey: publicKeyString
          },
          function(err, res) {
       //     console.log("callback");
            if (err) {
              alert(err);
            } else {
              if (res.exist) {
                // console.log(this.loginSess);
                Session.set("isLogin", res);
                // console.log("ssss");
                let address = EthUtil.pubToAddress(publicKey).toString("hex");
                Session.set("user.address", address);
              } else {
                this.loginError = true;
              }
            }
          }
        );

   
        var userinfo = Session.get("isLogin");
        /**
         * to 回调会在判断之后 需要两成登录
         */
        var userinfo = Session.get("isLogin");
       // console.log("userinfo：" + userinfo);
        if (userinfo && userinfo.exist) {
          // console.log("sss")
          this.$router.replace("/");
        }
     //   console.log("ssss");
      } else {
        this.loginError = true;
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