<template >
  <div  class="ui embed player">
      <video
          id="my-video"
          class="video-js"
          controls
          preload="auto"
          v-bind:poster="coverUrl"
         style="height: 560px;width:100%"
        >
          <source  v-bind:src="videoUrl" type="video/mp4" />
          <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that
            <a
              href="https://videojs.com/html5-video-support/"
              target="_blank"
            >supports HTML5 video</a>
          </p>
        </video>
  </div>
</template>

<script>
// import videojs from 'video.js'
export default {
  props: {
    video: Object
  },
  mounted() {
    this.init();
  },
  computed:{
      videoUrl:function() {
          return Meteor.settings.IPFS.file_base_url + this.video.ipfs;
      },
      coverUrl:function() {
            return Meteor.settings.IPFS.file_base_url + this.video.cover;
      }
  },
  methods: {
    init() {
      console.log("xxx");
      //   if (author && link)
    //   console.log(this.video);
      var player = this.$video('my-player');
    }
  }
};
</script>