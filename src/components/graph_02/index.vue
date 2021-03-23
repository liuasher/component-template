<template>
  <div class="graph" id="graph2-container">
    我是Graph_02
  </div>
</template>

<script lang="ts">
import { Chart, Util } from '@antv/g2';

export default {
  name: 'Graph02',
  mounted() {
    const data = [
      { type: '一线城市', value: 0.19 },
      { type: '二线城市', value: 0.21 },
      { type: '三线城市', value: 0.27 },
      { type: '四线及以下', value: 0.33 }
    ];
    const chart = new Chart({
      container: 'graph2-container',
      autoFit: true,
      height: 500
    });
    chart.data(data);

    chart.coordinate('theta', {
      radius: 0.75
    });
    chart.tooltip({
      showMarkers: false
    });

    const interval = chart
      .interval()
      .adjust('stack')
      .position('value')
      .color('type', ['#063d8a', '#1770d6', '#47abfc', '#38c060'])
      .style({ opacity: 0.4 })
      .state({
        active: {
          style: (element) => {
            const { shape } = element;
            return {
              matrix: Util.zoom(shape, 1.1)
            };
          }
        }
      })
      .label('type', (val) => {
        const opacity = val === '四线及以下' ? 1 : 0.5;
        return {
          offset: -30,
          style: {
            opacity,
            fill: 'white',
            fontSize: 12,
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)'
          },
          content: (obj) => `${obj.type}\n${obj.value}%`
        };
      });

    chart.interaction('element-single-selected');

    chart.render();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.graph {
  width: 400px;
  height: 200px;
  border: solid 1px #ffe793;
}
</style>
