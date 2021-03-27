<template>
  <div class="dashboard-02">
    我是Dist中引入的dashboard!!!!
    <Graph03 />
    <Graph02 />
    <Graph01 />
    <!-- <Dashboard01 /> -->
  </div>
</template>

<script>
import { Graph01, Graph02, Graph03 } from "../components/index";
// import { Graph02, Graph03, Dashboard01 } from '../dist/dashboard.common.js';
import { newQrCodeEncrypt, oldQrCodeEncrypt } from "../utils/qrCodeEncrypt";

// 原始wifi名称：LUMIwifi-GFW-5G
// 加密后wifi名称：VMUY+9<9u[\Kum[
// 原始wifi密码：qwertyuiopasdfghjklzxcvbnm,.1234567890
// 加密后wifi密码：1+=0.)-932A/><;:876(*?,@45vtqponmlkjir
// 扫码的字符串：b=lumi2g0zl2LiLyI2&d=aiot-coap-

export default {
  name: "Home",
  components: {
    Graph01,
    Graph03,
    Graph02,
  },
  mounted() {
    var value1 = oldQrCodeEncrypt("AIOT_iiap_test", false);
    var value2 = oldQrCodeEncrypt("qwer1234", true);
  },
};
</script>
<style scoped lang="scss">
@import "../dist/dashboard.css";
.dashboard-02 {
  display: flex;
  flex-direction: row;
}
</style>
