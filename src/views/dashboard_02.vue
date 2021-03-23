<template>
  <div class="dashboard-02">
    我是Dist中引入的dashboard
    <Graph03 />
    <Graph02 />
    <Graph01 />
    <!-- <Dashboard01 /> -->
  </div>
</template>

<script>
import { Graph01, Graph02, Graph03 } from "../components/index";
// import { Graph02, Graph03, Dashboard01 } from '../dist/dashboard.common.js';

export default {
  name: "Home",
  components: {
    Graph01,
    Graph03,
    Graph02,
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
