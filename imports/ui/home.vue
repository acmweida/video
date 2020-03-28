<template>
    <div>
        <router-link to="/" ></router-link>
        <router-view></router-view>
    </div>
</template>

<script>
import Content from './page/home/home'
import VueRouter from 'vue-router'

const routes = [
  {path:"/",component:Content}
]

const router = new VueRouter({
    routes
})


export default {
    data() {
        return {}
    },
    components:{
        Content
    },
    router
}
</script>