<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">部署合约</router-link> |
      <router-link to="/upload">信息上报</router-link> |
      <router-link to="/search">信息查询</router-link> |
      <router-link to="/test">测试Demo</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss" src="./assets/style/App.scss"></style>
