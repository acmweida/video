<template>
  <div class="videoband">
      <videosnap v-for="video in videos" v-bind:key="video._id" v-bind:video="video" v-bind:isAuthor="isAuthor"></videosnap>
  </div>
</template>

<script>
import videosnap from "./videosnap";
import videosnapslider from "./videosnapslider";
export default {
  props: {
    videoInfo: Object
  },
  components: {
    videosnap,
    videosnapslider
  },
  data() {
    // console.log(this.videoInfo)
    return {
      videos: this.videoInfo.videos,
      isAuthor: this.videoInfo.isAuthor
    };
  }
};
</script>
