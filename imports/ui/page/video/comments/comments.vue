<template>
  <div class="ui threaded comments" style='max-width: 9999px;'>
    <div class="ui fluid">
        <comment></comment>
    </div>
  </div>
</template>

<script>
import comment from './comment/comment'
export default {
  components:{
    comment
  }
}
</script>