<template name="uploadformsubmit">
  <button class="ui red right labeled dtube icon button editsubmit" type="button" style="float:right;margin-bottom: 10px">
      <div style="display:inline-block;padding: 0.8em 1em;">
          {{ VIDEO_EDIT}} 
      </div>
    <i class="checkmark icon red" style="background: white;opacity: 1;"></i>
  </button>
</template>

<script>
export default {
    data() {
        return {
             VIDEO_EDIT: "编辑"
        }
    }
}
</script>