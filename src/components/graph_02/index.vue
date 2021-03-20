<template>
  <div class="graph">
    我是Graph_02 {{msg}}
  </div>
</template>

<script lang="ts">
// import { Component, Prop, Vue } from 'vue-property-decorator';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
//   @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.graph{
    width: 200px;
    height: 400px;
    border: solid 1px #2685ff;
}
</style>
