<template >
  <div>
    <div class="ui right labeled icon button green transferdtcbtn dtube pos-rel">
      <div style="display:inline-block;padding: 0.2em;">{{ translate('CHANNEL_TRANSFER')}}</div>
      <i class="icon gift green" style="background:white;opacity:1;"></i>
    </div>
    <senddtcmodal v-bind:author="author"></senddtcmodal>
  </div>
</template>

<script>
import senddtcmodal from "../senddtcmodal";
export default {
  components: {
    senddtcmodal
  },
  props:{
      author:Object
  }
};
</script>