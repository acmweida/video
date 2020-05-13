<template>
  <div class="ui item grid tablet only computer" style="width:inherit;margin-left: 12rem;">
    <div class="ui search wid-ful">
      <div class="ui search">
        <div class="ui icon input">
          <input 
            class="prompt"
            type="text"
            placeholder="Search countries..."
            size="50"
            v-model="keyword"
             @keyup.enter="search"
          />
          <i  class="search icon" ></i>
        </div>
        <div class="results"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    search: function() {
      if (this.keyword || this.keyword.length > 0)
        this.$router.push("/user/search/" + this.keyword);
    }
  }
};
</script>
