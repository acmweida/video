<template>
  <sui-tab :menu="{ vertical: true, fluid: true, tabular: true }">
    <sui-tab-pane title="个人信息">
      <personinfo v-bind:author="author" v-on:update:title="author == $event" ></personinfo>
    </sui-tab-pane>
    <sui-tab-pane title="我的头像">
        <personpic v-bind:id="id" v-bind:pic="pic"></personpic>
    </sui-tab-pane>
  </sui-tab>
</template>

<script>
import personinfo from "./personalinfo/personalinfo";
import personpic from './personalpic/personalpic'
export default {
  props: {
    author: Object
  },
  data() {
    return {
      account: this.author.account,
      desc: this.author.desc ? this.author.desc : translate("AUTHOR_DESC_NO"),
      id:this.author._id,
      pic:this.author.pic ? this.author.pic : '/static/images/user.png'
    };
  },
  components: {
    personinfo,
    personpic
  }
};
</script>

<style scoped>
.publicKey {
  font: 12px/1.5 Microsoft YaHei, tahoma, \\5b8b\4f53, sans-serif;
  color: #717171;
  font-family: MicrosoftYaHei;
  margin: 0;
  padding: 0;
  position: relative;
  font-size: 14px;
  line-height: 30px;
}

.modal-content {
  padding: 80px 20px 56px;
  display: inline-block;
}

.container-bg[data-v-15325571] {
    width: 180px;
    height: 180px;
    background-color: #000;
    border-radius: 4px;
    border: 1px solid #e5e9ef;
}

.border-line {
    height: 182px;
    width: 1px;
    background: #e5e9ef;
    float: left;
}

.first-change-lb span {
    display: block;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #6d757a;
    line-height: 20px;
    margin-top: 10px;
    padding: 0 12px;
    letter-spacing: 0;
}

.first-change-lb i[data-v-15325571] {
    margin: 52px auto 0;
    width: 54px;
    height: 46px;
    display: block;
    background: url(https://s1.hdslb.com/bfs/static/account-fe/static/img/icons_m_2.57e5263.png);
    background-position: -101px -1065px;
}
.modal {
  font: 12px/1.5 Microsoft YaHei, tahoma, \\5b8b\4f53, sans-serif;
  color: #717171;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  margin: 0;
  padding: 0;
  width: 830px;
  text-align: center;
}

.img-clip-wrap {
  font: 12px/1.5 Microsoft YaHei, tahoma, \\5b8b\4f53, sans-serif;
  color: #717171;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  text-align: center;
  margin: 0;
  padding: 0;
  float: left;
  position: relative;
  margin-right: 40px;
}

.img-container .shadow-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  -webkit-box-direction: normal;
  font: 12px/1.5 Microsoft YaHei, tahoma, \\5b8b\4f53, sans-serif;
  color: #717171;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  text-align: center;
  box-sizing: inherit;
}

.crop-wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  cursor: crosshair;
  -webkit-box-direction: normal;
  font: 12px/1.5 Microsoft YaHei, tahoma, \\5b8b\4f53, sans-serif;
  color: #717171;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  text-align: center;
  box-sizing: inherit;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  cursor: crosshair;
}

.shadow-box,
.shadow-img {
  position: absolute;
  top: 0;
  left: 0;
}

.shadow-box {
  overflow: hidden;
  z-index: 1;
}

.shadow-box,
.shadow-img {
  position: absolute;
  top: 0;
  left: 0;
}

.point-lt {
  top: -10px;
  left: -10px;
  cursor: nw-resize;
}

.drag-point {
  display: inline-block;
  width: 10px;
  height: 10px;
  border: 1px solid #fff;
  position: absolute;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.point-lb {
  left: -10px;
  bottom: -10px;
  cursor: sw-resize;
}

.point-rt {
  right: -10px;
  top: -10px;
  cursor: ne-resize;
}

.point-rb {
  right: -10px;
  bottom: -10px;
  cursor: se-resize;
}

.first-change-lb {
  color: #717171;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  text-align: center;
  margin: 0;
  padding: 0;
  cursor: pointer;
  background: #f1f2f5;
  width: 180px;
  height: 180px;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid #e5e9ef;
  border-radius: 4px;
  transition: all 0.6s ease;
}
.reset-img {
  position: absolute;
  bottom: -28px;
  left: 50%;
  -webkit-transform: translate(-50%);
  transform: translate(-50%);
}

.border-line {
  height: 182px;
  width: 1px;
  background: #e5e9ef;
  float: left;
}

.img-preview-wrap {
  margin-left: 40px;
  margin-top: 30px;
  float: left;
}

.pre-container {
  width: 96px;
  height: 96px;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid #e6eaf0;
  background-size: cover;
}

.pre-info {
  margin-top: 20px;
  font-size: 12px;
  color: #99a2aa;
}

.descript {
  line-height: 16px;
  color: #99a2aa;
}

.modal-footer {
  text-align: center;
  margin-top: 40px;
}
</style>