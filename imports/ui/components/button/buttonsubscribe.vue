<template>
    <div class="ui red dtube button subscribe" tabindex="0" v-on:click="$emit('addSub')">
        <div style="display:inline-block;padding: 0.8em 1em;">
            {{ translate('VIDEO_SUBSCRIBE')}}
        </div>
        <div class="ui label btnlabel">
            {{subCount }}
        </div>
    </div>
</template>

<script>
export default {
    props:['subCount']
    // methods:{
    //     sub:function() {
    //         // console.log("sub")
    //         this.$emit("addSub")
    //     }
    // }
}
</script>