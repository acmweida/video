<template>
  <div>
    <div v-if="!orders" class="ui segment" style="height:800px;">
      <div class="ui active inverted dimmer">
        <div class="ui big text loader">Loading</div>
        <div>
          <img class="ui wireframe image" src="/static/images/loading_back.png" />
        </div>
      </div>
      <p></p>
    </div>
    <div v-else-if="orders.length > 0">
      <table class="ui celled table">
        <thead>
          <tr>
             <th>transsctionhash</th>
            <th>to</th>
            <th>video/author</th>
            <th>value</th>
            <th>time</th>
            <th>message</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" v-bind:key="order._id" >
            <td data-label="transsctionhash" v-bind:title="order.transsctionhash"> <span > {{order.transsctionhash}} </span></td>
            <td data-label="to" > <span v-bind:title="order.to">{{order.to}}</span></td>
            <td data-label="video">{{order.video}}</td>
            <td data-label="value">{{order.value}}</td>
            <td data-label="time">{{order.createDate}}</td>
            <td data-label="message">{{order.message}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="ui segment" style="height:800px;">
      <div class="ui active inverted dimmer">
        <!-- <div class="ui big text message"></div> -->
        {{ translate('NO_TRANSFOR') }}
      </div>
      <p></p>
    </div>
  </div>
</template>

<script>
import WEB3Util from "../../../../api/eth/web3";
import { Order } from "../../../collections/collection";
export default {
  data() {
    return {
      orders: null
    };
  },
  meteor: {
    $subscribe: {
      order: []
    }
  },
  created() {
    var address = Session.get("user.address");
    this.orders = Order.find({ from: address }).fetch();
  }
};
</script>


<style scoped>
span {
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
  width: 150px;
  display: block;
}
</style>