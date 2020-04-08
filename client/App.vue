<template>
  <div id="main" class="article" >
    <TopContainer></TopContainer>
    <router-view/>
  </div>
</template>

<script>
import TopContainer from '../imports/ui/TopContainer'
import Upload from '../imports/ui/page/upload/upload'


export default {
  data() {
    return {
      content: "Home"
    }
  },
  components:{
      TopContainer,
      Upload
  }
}
</script>