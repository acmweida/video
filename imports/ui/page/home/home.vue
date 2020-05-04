<template>
  <main class="ui maingrid content">
    <div class="top-banner"></div>
    <div class="ui container">
      <div
        v-if="hotVideos"
        class="ui left aligned grid show"
        style="margin-bottom:0rem;margin-left:0rem;margin-right:0rem;"
      >
        <div
          class="left floated  aligned ten wide column block-header all "
          style="padding-left:0px;"
        >
          <h2>
            <a href="/hotvideos">{{ translate("HOME_TITLE_HOT_VIDEOS")}}</a>
          </h2>
        </div>
        <div
          class="floated right aligned two wide column"
          style="padding-right:0px;margin-top: 8px;"
        >
          <a href="/hotvideos" style="color:#666666">
            <h5>{{ translate("HOME_SHOW_ALL") }}</h5>
          </a>
        </div>
      </div>
      <videoslider v-if="hotVideos" v-bind:videosType="hotVideos"></videoslider>
      <div class="ui divider"></div>
      <div
        v-if="trendingVideos"
        class="ui left aligned grid show"
        style="margin-bottom:0rem;margin-left:0rem;margin-right:0rem;"
      >
        <div
          class="left floated  aligned ten wide column block-header all"
          style="padding-left:0px;"
        >
          <h2>
            <a href="/trendingvideos">{{ translate("HOME_TITLE_TRENDING_VIDEOS")}}</a>
          </h2>
        </div>
        <div
          class="floated right aligned two wide column"
          style="padding-right:0px;margin-top: 8px;"
        >
          <a href="/trendingvideos" style="color:#666666">
            <h5>{{ translate("HOME_SHOW_ALL")}}</h5>
          </a>
        </div>
      </div>
      <videoslider v-if="trendingVideos" v-bind:videosType="trendingVideos"></videoslider>
      <div class="ui divider"></div>
      <div
        v-if="newVideos"
        class="ui left aligned grid show"
        style="margin-bottom:0rem;margin-left:0rem;margin-right:0rem;"
      >
        <div
          class="left floated  aligned ten wide column block-header all"
          style="padding-left:0px;"
        >
          <h2>
            <a href="/newvideos">{{ translate("HOME_TITLE_NEW_VIDEOS")}}</a>
          </h2>
        </div>
        <div
          class="floated right aligned two wide column"
          style="padding-right:0px;margin-top: 8px;"
        >
          <a href="/newvideos" style="color:#666666" >
            <h5>{{ translate("HOME_SHOW_ALL")}}</h5>
          </a>
        </div>
      </div>
      <videoslider v-if="newVideos" v-bind:videosType="newVideos"></videoslider>
      <div class="ui divider"></div>
    </div>
  </main>
</template>


<script>
import videoslider from "../../components/video/videoslider";
import WEB3Util from '../../../api/eth/web3'
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
  }
};
</script>

<style>
.top-banner {
  background-color: white;
  text-align: center;
  margin-bottom: 100px;
}

.show {
  max-height: 60px;
}

.all {
  margin-top: 0px;
}

</style>