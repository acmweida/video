<template>
  <div id="app" class="bottom-filling">
    <div data-v-1b41bfec>
      <div data-v-1b41bfec class="top-banner">
      </div>
      <div data-v-1b41bfec class="title-line">
        <span class="tit" style="font-size: 38px;">注册</span>
      </div>
      <div data-v-1b41bfec class="register-container">
        <form
          data-v-1b41bfec
          id="registerForm"
          method="post"
          onsubmit="return false;"
          class="report-wrap-module"
        >
          <div data-v-1b41bfec class="form-group">
            <div data-v-1b41bfec class="el-input">
              <!---->
              <input
                type="text"
                autocomplete="off"
                name="uname"
                placeholder="昵称"
                class="el-input__inner"
              />
              <!---->
              <!---->
              <!---->
              <!---->
            </div>
            <p data-v-1b41bfec class="error-message"></p>
          </div>
          <div data-v-1b41bfec class="register-hidden-gruop">
            <div data-v-1b41bfec class="safe_window" style="display: none;">
              <p data-v-1b41bfec>安全系数</p>
              <div data-v-1b41bfec class="a_pw"></div>
            </div>
          </div>
          <div data-v-1b41bfec class="form-group">
            <div data-v-1b41bfec class="el-input">
              <!---->
              <input
                type="password"
                autocomplete="off"
                name="userpwd"
                placeholder="密码（6-16个字符组成，区分大小写）"
                class="el-input__inner"
              />
              <!---->
              <!---->
              <!---->
              <!---->
            </div>
            <p data-v-1b41bfec class="error-message"></p>
          </div>
          <div data-v-1b41bfec class="form-group register-hidden-gruop text-right">
            <!---->
            <!---->
          </div>
          <div data-v-1b41bfec class="form-group">
            <button
              data-v-1b41bfec
              disabled="disabled"
              type="button"
              class="el-button btn-full el-button--primary is-disabled"
            >
              <!---->
              <!---->
              <span>注册</span>
            </button>
          </div>
          <div
            data-v-1b41bfec
            id="register_pc_direct_login"
            class="register-hidden-gruop text-right"
          >
            <a data-v-1b41bfec href="/login">已有账号，直接登录&gt;</a>
          </div>
        </form>
        <!---->
        <!---->
        <!---->
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>

.bottom-filling:after {
    height: 387px;
    display: block;
    content: "";
}

.international-header, .van-popover {
    font: 14px -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
    position: relative;
    z-index: 1000;
    margin: 0;
    padding: 0;
}

.top-banner {
    background: #00a0d8;
    height: 90px;
    text-align: center;
    margin-bottom: 20px;
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
.register-container[data-v-1b41bfec] {
    width: 980px;
    margin: 0 auto;
    padding: 60px 0;
}

.form-desc[data-v-1b41bfec], .form-group[data-v-1b41bfec] {
    width: 420px;
    margin: 0 auto;
    font-size: 12px;
    position: relative;
}

* {
    font-family: "PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif";
    -webkit-tap-highlight-color: rgba(255,255,255,0);
}

.el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
}

.error-message[data-v-1b41bfec] {
    color: #f45d90;
    position: absolute;
    right: -20px;
    top: 12px;
    -webkit-transform: translate3d(100%,0,0);
    -moz-transform: translate3d(100%,0,0);
    transform: translate3d(100%,0,0);
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
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}

.register-hidden-gruop[data-v-1b41bfec] {
    width: 420px;
    height: 40px;
    margin: 0 auto;
}

.form-desc[data-v-1b41bfec], .form-group {
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
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
}

#app .el-button.is-disabled, #app .el-button.is-disabled:focus, #app .el-button.is-disabled:hover {
    color: rgba(0,0,0,.25);
    background-color: #f5f5f5;
    border-color: #d9d9d9;
}

.el-button  {font-family: "PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif";
-webkit-tap-highlight-color: rgba(255,255,255,0);
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
transition: .1s;
font-weight: 500;
padding: 12px 20px;
font-size: 14px;
border-radius: 4px;
cursor: not-allowed;
background-image: none;
width: 100%;
height: 40px;
color: rgba(0,0,0,.25);
background-color: #f5f5f5;
border-color: #d9d9d9;
}

.register-hidden-gruop.text-right[data-v-1b41bfec] {
    line-height: 40px;
    text-align: right;
}

.register-hidden-gruop[data-v-1b41bfec] {
    width: 420px;
    height: 40px;
    margin: 0 auto;
}

a {
    color: #00a1d6;
}
</style>