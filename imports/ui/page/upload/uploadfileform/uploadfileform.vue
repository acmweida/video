<template>
  <div>
    <div class="ui top attached tabular menu" style="margin-top: 0rem;display:inline-block;">
      <a
        class="item basics active"
        style="display:inline-block;"
        data-tab="first"
      >{{ UPLOAD_BASICS}}</a>
    </div>
    <div
      class="ui bottom attached tab segment active"
      data-tab="first"
      style="margin:auto;padding-left: 1px;padding-right:1px;border-width: 0px;background: transparent;"
    >
      <div id="infozone" style="text-align:left;">
        <form class="ui form uploadform">
          <div class="field">
            <label>{{ UPLOAD_TITLE }}</label>
            <input
              id="uploadTitle"
              type="text"
              name="title"
              v-bind:placeholder="UPLOAD_TITLE"
              v-model="title"
            />
          </div>
          <div class="field">
            <label>{{ UPLOAD_DESCRIPTION }}</label>
            <textarea id="uploadDescription" rows="4" name="description" v-bind="description"></textarea>
          </div>
          <div class="field">
            <label>{{ UPLOAD_TAGS}}</label>
            <select id="tagDropdown" name="skills" class="ui fluid search dropdown">
              <option value></option>
              <option v-for="tag in  topTags" v-bind:key="tag" v-bind:value="tag">{{tag}}</option>
            </select>
          </div>
        </form>
      </div>
    </div>

    <button
      class="ui red right labeled dtube icon button uploadsubmit"
      type="button"
      style="margin-bottom:10px;"
    >
      <div style="display:inline-block;padding: 0.8em 1em;">{{ UPLOAD_SUBMIT }}</div>
      <!-- <i class="checkmark icon red" style="background: white;opacity: 1;"></i> -->
    </button>
    <!-- if -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      VIDEO_EDIT: "编辑",
      UPLOAD_SUBMIT: "提交",
      UPLOAD_BASICS: "Basics",
      UPLOAD_DESCRIPTION: "视屏详情",
      UPLOAD_TAGS: "标签",
      description: "",
      topTags: ["生活", "游戏"],
      UPLOAD_TITLE: "题目",
      title: ""
    };
  },
};
</script>

