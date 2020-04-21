<template >
    <div class="ui grey dtube button unsubscribe" tabindex="0">
        <div style="display:inline-block;padding: 0.8em 1em;">
            {{ translate('VIDEO_UNSUBSCRIBE')}}
        </div>
        <div class="ui label btnlabel">
             {{subCount}} 
        </div>
    </div>
</template>

<script>
export default {
    props:['subCount']
}
</script>