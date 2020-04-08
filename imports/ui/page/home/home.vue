<template>
  <main class="ui maingrid content">
    
    <div class="ui container">
      <div class="top-banner"></div>
      <div
        v-if="hotVideos"
        class="ui left aligned grid"
        style="margin-bottom:0rem;margin-left:0rem;margin-right:0rem;"
      >
        <div
          class="left floated left aligned ten wide column block-header"
          style="padding-left:0px;"
        >
          <h2>
            <a href="/hotvideos">{{ translateWapper("HOME_TITLE_HOT_VIDEOS")}}</a>
          </h2>
        </div>
        <div
          class="floated right aligned two wide column"
          style="padding-right:0px;margin-top: 8px;"
        >
          <a href="/hotvideos" style="color:#666666">
            <h5>{{ translateWapper("HOME_SHOW_ALL") }}</h5>
          </a>
        </div>
      </div>
      <videoslider v-if="hotVideos" v-bind:videosType="hotVideos"></videoslider>
      <div class="ui divider"></div>
      <div
        v-if="trendingVideos"
        class="ui left aligned grid"
        style="margin-bottom:0rem;margin-left:0rem;margin-right:0rem;"
      >
        <div
          class="left floated left aligned ten wide column block-header"
          style="padding-left:0px;"
        >
          <h2>
            <a href="/trendingvideos">{{ translateWapper("HOME_TITLE_TRENDING_VIDEOS")}}</a>
          </h2>
        </div>
        <div
          class="floated right aligned two wide column"
          style="padding-right:0px;margin-top: 8px;"
        >
          <a href="/trendingvideos" style="color:#666666">
            <h5>{{ translateWapper("HOME_SHOW_ALL")}}</h5>
          </a>
        </div>
      </div>
      <videoslider v-if="trendingVideos" v-bind:videosType="trendingVideos"></videoslider>
      <div class="ui divider"></div>
      <div
        v-if="newVideos"
        class="ui left aligned grid"
        style="margin-bottom:0rem;margin-left:0rem;margin-right:0rem;"
      >
        <div
          class="left floated left aligned ten wide column block-header"
          style="padding-left:0px;"
        >
          <h2>
            <a href="/newvideos">{{ translateWapper("HOME_TITLE_NEW_VIDEOS")}}</a>
          </h2>
        </div>
        <div
          class="floated right aligned two wide column"
          style="padding-right:0px;margin-top: 8px;"
        >
          <a href="/newvideos" style="color:#666666">
            <h5>{{ translateWapper("HOME_SHOW_ALL")}}</h5>
          </a>
        </div>
      </div>
      <videoslider v-if="newVideos" v-bind:videosType="newVideos"></videoslider>
      <div class="ui divider"></div>
    </div>
  </main>
</template>


<script>
import videoslider from "../../components/comment/video/videoslider";
export default {
  data() {
    return {
      feedVideos:"feedVideos",
      trendingVideos:"trendingVideos",
      hotVideos:"hotVideos",
      newVideos:"newVideos"
    };
  },
  components: {
    videoslider
  },
  methods: {
    translateWapper: function(code) {
      return translate(code);
    }
  }
};
</script>

<style>
.top-banner {
  background-color: white;
  text-align: center;
  margin-bottom: 60px;
}
</style>