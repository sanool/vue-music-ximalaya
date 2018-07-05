<template>
  <div id="app">
    <div class="header">
      <div class="icon-aboutMe"></div>
      <div class="header-title">喜马拉雅</div>
      <div class="icon-search"></div>
    </div>
    <div class="tabs">
      <router-link tag="div" to="/recommend" class="tabs-item" active-class="active">推荐</router-link>
      <router-link tag="div" to="/itemize" class="tabs-item" active-class="active">分类</router-link>
      <router-link tag="div" to="/ranklist" class="tabs-item" active-class="active">排行榜</router-link>
    </div>
    <router-view class="content"></router-view>
  </div>
</template>

<script>
  let tabs = {
    contacts: "Contacts",
    weChat: "WeChat",
    discover: "Discover",
    me: "Me",
  };
  export default {
    name: 'app',
    data () {
      return {

      }
    },
    components: {
    },
    methods: {

    },
    computed: {

    }
  }
</script>

<style>
  .header {
    position: relative;
    height: 7%;
    width: 100%;
    background: #eb3f17;
    color: white;
  }

  .header-title {
    text-align: center;
    width: 100%;
    font-size: 20px;
    font-weight: 400;
    line-height: 48px;
  }

  .icon-aboutMe{
    position: absolute;
    left: 0;
    top: 10px;
    width: 20px;
    height: 20px;
    background: blue;
  }
  .icon-search{
    position: absolute;
    right: 0;
    top: 10px;
    width: 20px;
    height: 20px;
    background: yellow;
  }

  .tabs{
    display: flex;
    background: #eb3f17;
    color: white;
    height: 40px;
  }

  .tabs-item{
    flex: 1;
    text-align: center;
    line-height: 40px;
    font-size: 12px;
    font-weight: 400;
  }

  .tabs-item.active{
    font-size: 14px;
    font-weight: 500;
    background: #e53911;
  }
</style>

