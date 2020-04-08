<template>
   <div class="ui item grid tablet only computer" style="width:inherit;margin-left: 12rem;">
        <div class="ui search wid-ful">
          <div class="ui icon input wid-ful">
            <form class="searchForm wid-ful">
              <input id="dsearch" type="text" name="search" placeholder="寻找视频…" autocomplete="off" />
            </form>
            <div style="background-color:white;width:90px;text-align:center" >
              <!-- <ion-icon name="search-outline"></ion-icon> -->
           <i class="icon ion-search" style="font-size:32px" ></i>
            </div>
          </div>
          <div class="results" style="display: none;"></div>
        </div>
      </div>
</template>

<script>
export default {
    
}
</script>
