<template>
   <div
    class="ui indicating progress initbar "
    style="width:698px"
  >
    <div class="bar"  style="background:red" id="red"  ></div>
     <div class="label" style="margin-top:10px" >
          {{ info }}
          <!-- {{#if ipfsAddSourceVideo.positionInQueue}}  v-bind:style="{ width: progess + 'px' }"
          {{ translate 'UPLOAD_PROGRESS_WAITING_IN_QUEUE'}}{{ipfsAddSourceVideo.positionInQueue}}
          {{/if}} -->
    </div>
  </div> 

  <!-- <div></div> -->
</template>

<script>
export default {
  props:[
    'progess','info'
  ],
  data() {
    return {
       UPLOAD_UPLOADING_VIDEO: "上传视频",
      UPLOAD_PROGRESS_ADDING_SOURCE_TO_IPFS: "添加资源到IPFS",
      UPLOAD_PROGRESS_WAITING_IN_QUEUE: "正在等待队列"
    };
  }
};
</script>
