<template >
  <div
    class="owl-carousel owl-theme wid-ful"
    style="background: transparent!important;"
    v-bind:id="id"
  >
      <videosnapslider v-for="video in videos" v-bind:key="video._id" v-bind:video="video" />
  </div>
</template>

<script>
import videosnapslider from './videosnapslider'
import { Video } from "../../collections/collection"
var carousel = require("owl.carousel");
export default {
  props: {
    videosType: String
  },
  data() {
    return {
      id: Math.floor(Math.random() * 10000) + "",
    };
  },
  components:{
    videosnapslider
  },
  meteor: {
    $subscribe: {
      // Subscribes to the 'threads' publication with no parameters
      nawVideos: []
    },
    videos() {
      let videosArr = Video.find({}).fetch();
      return videosArr;
    }
  },
  mounted: function() {
    $("#" + this.id).owlCarousel({
      loop: true,
      margin: 10,
      responsiveBaseElement: document.getElementsByClassName("ui container"),
      nav: true,
      navText: [
        "<i class='chevron left icon semanticui-nextprev-icon'></i>",
        "<i class='chevron right icon semanticui-nextprev-icon'></i>"
      ],
      animateOut: "slideOutDown",
      animateIn: "flipInX",
      dots: false,
      lazyLoad: true,
      responsiveClass: true,
      responsive: {
        211: {
          items: 1,
          slideBy: 1,
          nav: false
        },
        399: {
          items: 2,
          slideBy: 2,
          nav: false
        },
        642: {
          items: 3,
          slideBy: 2,
          nav: true
        },
        854: {
          items: 4,
          slideBy: 3,
          nav: true
        },
        1060: {
          items: 5,
          slideBy: 4,
          nav: true,
          loop: true
        },
        1272: {
          items: 6,
          slideBy: 5,
          nav: true,
          loop: true
        },
        1484: {
          items: 7,
          slideBy: 5,
          nav: true,
          loop: true
        }
      }
    });
  }
};
</script>


