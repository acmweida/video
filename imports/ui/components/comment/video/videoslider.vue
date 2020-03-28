<template name='videoslider'>
 <div>
  <div class='owl-carousel owl-theme wid-ful' style="background: transparent!important;">
    <div v-for="video in videos" v-bind:key="video.id">
       <h1>videosnapslider</h1>   
    </div>
  </div>
  <div class="ui divider"></div>
  </div>
</template>

<script>
export default {
    props:{
        videos:Array
    }
}
</script>


