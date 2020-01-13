<template>
  <div id="app">
    <main-tab-bar/>
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import mainTabBar from 'components/content/mainTabBar/mainTabBar'
export default {
  name: 'App',
  components:{
    mainTabBar,
  }
}
</script>

<style>
    @import 'assets/css/base.css';
</style>
