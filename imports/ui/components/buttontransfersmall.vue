<template>
    <senddtcmodal v-bind:author="author" v-bind:video="video"></senddtcmodal>
</template>

<script>
import senddtcmodal from "../components/senddtcmodal";
export default {
  props:{
    author:Object,
    video:Object
  },
  components: {
    senddtcmodal
  }
};
</script>