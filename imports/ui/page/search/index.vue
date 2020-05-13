<template>
  <div class="ui maingrid content">
    <div class="top-banner"></div>
    <div class="ui container">
      <h5>共搜索到 {{videos.length}} 个视频</h5>
      <div class="ui horizontal section divider"></div>

      <div class="ui five column grid">
        <div v-for="video in videos" v-bind:key="video._id" class="column">
          <videosnapslider v-bind:video="video" />
        </div>
      </div>

      <div class="ui horizontal section divider"></div>
      <div class="center">
        <div class="ui pagination menu">
          <a class="item">首页</a>
          <a :class="  current == 1 ? 'disabled item': 'item'" v-on:click="before">前一页</a>
          <div class="item">第{{current}}页</div>
          <a class="item" :class="  current == pagecount ? 'disabled item': 'item'" v-on:click="next">后一页</a>
          <a class="item">共 {{pagecount}} 页</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import videosnapslider from "../../components/video/videosnapslider";
import { Video } from "../../collections/collection";
export default {
  data() {
    return {
      // totalcount: 0,
      pagesize: 20,
      // pagecount: 0,
      current: 1
    };
  },
  methods:{
    before:function() {
      this.current == 1 ? this.current : this.current = this.current -1;
     
    },
    next:function() {
     this.current == this.pagecount ? this.current :  this.current = this.current + 1;
    }
  },
  components: {
    videosnapslider
  },
  meteor: {
    $subscribe: {
      videos: []
    },
    totalcount:function() {
       return  Video.find({ waive: true, check: 1, isdelete: false }).count()
    },
    pagecount:function() {
      return Math.floor(this.totalcount/this.pagesize)+1;
    },
    videos: function() {
    //   console.log(
    //     Video.find({ waive: true, check: 1, isdelete: false }).count()
    //   );
    console.log( this.$route.params.keyword);
        var keyword = this.$route.params.keyword;
       var reg =  new RegExp('/'+keyword+'/');
       console.log(reg)
       var reg = '/'+keyword+'/'
      var res = Video.find(
        { waive: true, check: 1, isdelete: false,title:{$regex:eval(reg)} }
      ).fetch();
      console.log(res);
      return res;
    }
  }
};
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
}
</style>