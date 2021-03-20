<template>
  <div class="dashboard-01">
    我是开发中中引入的dashboard
    <Graph01/>
    <Graph02/>
    <Graph01/>
  </div>
</template>

<script>
import { Graph01, Graph02 } from '../components/index';

export default {
  name: 'Home',
  components: {
      Graph01,
      Graph02
  },
};
</script>
<style scoped lang="scss">
.dashboard-01{
    display: flex;
    flex-direction: row;
}
</style>
