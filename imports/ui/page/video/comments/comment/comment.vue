<template>
  <div class="ui threaded comments">
    <div class="comment">
      <a class="avatar">
        <img v-bind:src=" getImgUrl(userinfo)" />
      </a>
      <div class="content">
        <a class="author">{{userinfo.account}}</a>
        <div class="metadata">
          <span class="date">{{ dateFrom(comment.createDate) }}</span>
        </div>
        <div class="text">{{comment.comment}}</div>
        <div class="actions">
          <a class="reply">回复</a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { User } from "../../../../collections/collection";

export default {
  props: {
    comment: Object
  },
  meteor: {
    $subscribe: {
      user: []
    }
  },
  computed: {
    userinfo: function() {
      return User.findOne({ _id: this.comment.userid });
    }
    // img:function() {
    //   getImgUrl(userinfo)
    // }
  }
};
</script>