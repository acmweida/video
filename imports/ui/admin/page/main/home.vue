<template>
  <div>
    <div class="ui grid">
      <div class="three column row">
        <div class="column">
          <div class="ui statistics">
            <div class="statistic">
              <div class="value" style="height:80px;">22</div>
              <div class="label" style="height:40px;">Faves</div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="ui statistics">
            <div class="statistic">
              <div class="value">22</div>
              <div class="label">Faves</div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="ui cards">
            <div class="ui statistics">
              <div class="statistic">
                <div class="value">22</div>
                <div class="label">Faves</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Row>
      <Card shadow>
        <example style="height: 600px;width:1400px;" />
      </Card>
    </Row>
  </div>
</template>

<script>
import InforCard from "../../compoents/info-card";
import CountTo from "../../compoents/count-to";
import { ChartPie, ChartBar } from "../../compoents/charts";
import Example from "./example.vue";
export default {
  name: "home",
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data() {
    return {
      inforCardData: [
        {
          title: "新增用户",
          count: 803
        },
        { title: "新增视频", count: 232 },
        {
          title: "待审核视频",
          count: 142
        }
      ],
      pieData: [
        { value: 335, name: "直接访问" },
        { value: 310, name: "邮件营销" },
        { value: 234, name: "联盟广告" },
        { value: 135, name: "视频广告" },
        { value: 1548, name: "搜索引擎" }
      ],
      barData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324
      }
    };
  },
  mounted() {
    //
  }
};
</script>

<style >
.count-style {
  font-size: 50px;
}
</style>
