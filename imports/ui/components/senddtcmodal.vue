
<template >
  <!-- Send DTC Modal -->
  <div
    class="ui small modal transferdtc"
    style="z-index:1001; position: fixed; top:50%; left:50%; transform: translate(-50%, -50%)"
  >
    <div class="header" style="border-bottom: 0">
      {{ translate('TRANSFER_TO') }} {{author.account}}
      <!-- <img class="ui avatar image" src="{{userPic recipient}}">             -->
    </div>
    <div class="content">
      <form class="ui large form wid-ful">
        <div class="ui segments">
          <div class="ui segment" style="padding: 20px;">
            <div class="field">
              <label>{{ translate('TRANSFER_AMOUNT')}}</label> -->
              <div class="ui left icon input">
              
                <select v-model="value">
                    <i class="calculator icon"></i>
                  <option disabled value="1">请选择</option>
                   <option>1</option>
                  <option>2</option>
                </select>
              </div>
            </div>
            <div class="field">
              <label>{{ translate('TRANSFER_MEMO')}}</label>
              <div class="ui left icon input">
                <i class="pencil icon"></i>
                <input type="text" id="transfer_memo"  v-model="memo" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="actions">
      <div
        id="confirmTransfer"
        class="ui right labeled icon button red dtube pos-rel"
        v-on:click="confirm"
      >
        <div style="display:inline-block;padding: 0.8em 1em;">Confirm</div>
        <!-- <i class="icon check red" style="background:white;opacity:1;"></i> -->
        <!-- <i class="icon white loading spinner dsp-non" style="background-color: transparent;opacity:1;"></i> -->
      </div>
      <div
        id="cancelTransfer"
        class="ui right labeled icon button grey dtube pos-rel"
        v-on:click="cancel"
      >
        <div style="display:inline-block;padding: 0.8em 1em;">Cancel</div>
        <!-- <i class="icon x" style="background:white;opacity:1;"></i> -->
      </div>
    </div>
    <div id="transfor" v-on:click="transfor"></div>
   
  </div>
</template>

<script>
import Web3Util from "../../api/eth/web3";
import EthUtil from "ethereumjs-util";
import { Order, Video,User } from "../collections/collection";
export default {
  props: {
    author: Object,
    video: Object
  },
  data() {
    return {
      value: 1,
      memo:""
    };
  },
  meteor: {
    $subscribe: {
      order: [],
      video: [],
      user:[]
    }
  },
  methods: {
    cancel: function() {
      $(".transferdtc").hide();
    },
    confirm: function() {
      var address = Session.get("user.address");
      if (!address) {
        this.$router.replace("/user/login");
        return;
      }
      var value = this.value;
      var valueToWei = Web3Util.toWei(value.toString(), "ether");
      cb = function(err, res) {
        if (err) {
          alert(err);
        } else {
          console.log(res);
          console.log(valueToWei)
          console.log(typeof res);
          console.log(typeof valueToWei);
          console.log(res < valueToWei);
          if (new Number(res) < new Number(valueToWei)) {
            toastr.info(
              translate("CHANNEL_SAVINGS_NOT"),
              translate("TIPS_TITLE")
            );
          } else {
            $("#transfor").click();
          }
        }
      };
      Web3Util.getBalance(address, cb);
    },
    transfor() {
      var from = Session.get("user.address");
      var video = this.video;
      if (video < 0) {
        return ;
      }
      let address = "0x"+video.author;
      console.log(address)
      var author = this.author;
      var memo = this.memo
      // var resId = this.video.resid;
      // console.log(resId)
      // cb = function(err, res) {
      //   if (err) {
      //     alert(err);
      //   } else {
      //     console.log(res)
      //   }
      // };
      // Web3Util.findResourceInfo(from, resId,cb);
      // var to = EthUtil.pubToAddress("0x"+this.author.publicKey).toString("hex");
      console.log(from)
      // console.log(to)
      var value = this.value;
      var valueToWei = Web3Util.toWei(value.toString(),'ether')

      var resId = this.video.resid;
      console.log(valueToWei)
      cb = function(err,res){
          if (err) {
              alert(err)
          } else {
              console.log(res)
              toastr.success(translate("TRANSFOR_SUCCESS"),translate("USERS_SUCCESS"))
              const groceriesId = Order.insert({transsctionhash:res,from:from,video:resId,to:address,value:value,message:memo,createDate:new Date()});
              if (groceriesId)  {
                  value = parseInt(value);
                  toastr.success(translate("TRANSFOR_LOG_SUCCESS"),translate("USERS_SUCCESS"));
                  Video.update({_id:video._id},{ $inc: { gratuityNum: value}});
                  User.update({_id:author._id},{ $inc: { gratuityNum:value }});
              }
          }
      }
      Web3Util.buy(from,valueToWei,resId,cb)
  
      // var to = EthUtil.pubToAddress(this.video.author.toString("hex")).toString("hex");
      // Web3Util.transfor(from,to,valueToWei);
    },
    changeGratuityNum:function() {
      this.video.gratuityNum = this.video.gratuityNum + this.value
    }
  }
};
</script>

