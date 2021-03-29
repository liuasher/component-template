<template>
  <div id="app" class="container">
    <div class="navigation">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <div class="dashboard"><router-view /></div>
  </div>
</template>

<style lang="scss" scoped>
#app {
  position: absolute;
  width: 100%;
  height: 100%;
}
.container {
  display: flex;
  width: 100%;
  height: 100%;
  .navigation {
    display: flex;
    flex-direction: column;
    width: 100px;
    padding: 10px;
    border-right: solid 1px #dee1e6;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #2586ff;
      }
    }
  }
  .dashboard {
    width: 100%;
  }
}
</style>
