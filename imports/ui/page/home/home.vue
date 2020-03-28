<template>
    <div  class="ui container">
      <div data-v-0c98c25d class="top-banner"></div>
        <div v-if="feedVideos" >
          <h2>{{ HOME_TITLE_FEED_VIDEOS}}</h2>
            <videoslider v-bind:videos="feedVideos">
            </videoslider>
           videoslider feedVidfeos
        </div>
        <div v-if="hotVideos" >
          <div class="ui left aligned grid" style="margin-bottom:0rem;margin-left:0rem;margin-right:0rem;">
          <div class="left floated left aligned ten wide column block-header" style="padding-left:0px;">
            <h2><a href='/hotvideos'>{{ HOME_TITLE_HOT_VIDEOS}}</a></h2>
          </div>
          <div class=" floated right aligned two wide column" style="padding-right:0px;margin-top: 8px;">
              <a href='/hotvideos' style="color:#666666"><h5>{{  HOME_SHOW_ALL }}</h5></a>
          </div>
        </div>
          <videoslider v-bind:videos="hotVideos">
          
          </videoslider>
           videoslider hotVideos
        </div>
       
       <div v-if="trendingVideos" >
        <div class="ui left aligned grid" style="margin-bottom:0rem;margin-left:0rem;margin-right:0rem;">
            <div class="left floated left aligned ten wide column block-header" style="padding-left:0px;">
                <h2><a href='/trendingvideos'>{{ HOME_TITLE_TRENDING_VIDEOS }}</a></h2>
              </div>
              <div class=" floated right aligned two wide column" style="padding-right:0px;margin-top: 8px;">
                  <a href='/trendingvideos' style="color:#666666"><h5>{{ HOME_SHOW_ALL }}</h5></a>
              </div>
            </div>
            <videoslider v-bind:videos="trendingVideos">
          
          </videoslider>
           videoslider trendingVideos
        </div>
        <div v-if="newVideos" >
        
        <div class="ui left aligned grid" style="margin-bottom:0rem;margin-left:0rem;margin-right:0rem;">
            <div class="left floated left aligned ten wide column block-header" style="padding-left:0px;">
                <h2><a href='/newvideos'>{{ HOME_TITLE_NEW_VIDEOS }}</a></h2>
              </div>
              <div class=" floated right aligned two wide column" style="padding-right:0px;margin-top: 8px;">
                  <a href='/newvideos' style="color:#666666"><h5>{{ HOME_SHOW_ALL }}</h5></a>
              </div>
            </div>
            <videoslider v-bind:videos="newVideos">
          
            </videoslider>
           videoslider newVideos
           </div>
       
    </div>
</template>

<script>
import videoslider from '../../components/comment/video/videoslider'
export default {
    data() {
        return {
            HOME_TITLE_FEED_VIDEOS:'订阅的新内容',
            HOME_TITLE_HOT_VIDEOS:"热门视频",
            HOME_TITLE_TRENDING_VIDEOS:'潮流视频',
            HOME_SHOW_ALL: "显示全部",
            HOME_TITLE_NEW_VIDEOS:"新视频",
        }
    },
    components:{
      videoslider
    },
    computed:{
      feedVideos:function() {
        return [{id:1},{id:2},{id:3}]
      },
      trendingVideos:function() {
        return [{id:1},{id:2}]
      },
      hotVideos:function() {
        return [{id:1},{id:2}]
      },
      newVideos:function() {
        return [{id:1},{id:2}]
      }
    }
}
</script>

<style>

.top-banner {
  background-color:white;
  height: 56px;
  text-align: center;
  margin-bottom: 60px;
}

</style>