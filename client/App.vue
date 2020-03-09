<template>
  <div id="main" class="main">
    <TopContainer></TopContainer>
    <component v-bind:is="contentType"></component>
  </div>
</template>

<script>
import TopContainer from '../imports/ui/TopContainer'
import Register from '../imports/ui/register'
import Login from '../imports/ui/login'
import Home from '../imports/ui/home'


export default {
  data() {
    return {
      content: "Home"
    }
  },
  components:{
      TopContainer,
      Register,
      Login,
      Home
  },
  methods:{
   
  },
  meteor: {
     contentType() {
        if (Session.get("contentType") === undefined ) {
          Session.set("contentType","Home"); 
        } 
        this.content = Session.get("contentType");
        return this.content;
    }
  }
}
</script>

<style>
.main {
  width: 100%;
  margin: 0 auto;
}
</style>