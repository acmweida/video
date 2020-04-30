<template>
    <div>
        <TopContainer></TopContainer>
        <router-view></router-view>
    </div>
</template>

<script>
import TopContainer from './TopContainer'
import WEB3Util from '../api/eth/web3'
export default {
    data() {
        return {}
    },
    methods:{
   
    },
    components:{
        TopContainer
    }
}
</script>