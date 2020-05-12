<template>
  <div class="ui threaded comments" style="max-width: 9999px;">
    <div class="ui fluid">
       <h3 class="ui dividing header">Comments</h3>
      <comment v-for="comment in commentsInfo" v-bind:key="comment._id" v-bind:comment="comment"></comment>
    </div>
  </div>
</template>

<script>
import comment from "./comment/comment";
import { Comment } from "../../../collections/collection";
export default {
  props: {
    resId: String
  },
  components: {
    comment
  },
  meteor: {
    $subscribe: {
      comment: []
    },
    commentsInfo: function() {
      return Comment.find(
        { videoid: this.resId },
        { limit: 25, sort: { createDate: -1 } }
      ).fetch();
    }
  }
};
</script>