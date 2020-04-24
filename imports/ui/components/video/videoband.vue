<template>
  <div class="videoband">
      <div  v-if="videos">
      <videosnap  v-for="video in videos" v-bind:key="video._id" v-bind:video="video" v-bind:isAuthor="isAuthor"></videosnap>
      </div>
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
  computed:{
     isAuthor: function() {
      return this.videoInfo.isAuthor
     },
     videos:function() {
      return this.videoInfo.videos;
    }
  }
};
</script>
