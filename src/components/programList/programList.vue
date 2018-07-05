<template>
  <div class="programlist">
    <div class="programlist-header clearfix">
      <div class="programlist-header-return icon-play"></div>
      <img class="programlist-header-img pull-left" :src="mainInfo.cover"></img>
      <div class="programlist-header-title pull-left">
        <div class="programlist-header-title-name">{{mainInfo.albumTitle}}</div>
        <div class="programlist-header-title-author">{{anchorInfo.anchorName}}</div>
        <div class="programlist-header-title-type">{{type}}></div>
        <div class="programlist-header-title-time">{{mainInfo.updateDate}}更新</div>
      </div>
    </div>
    <div class="programlist-tabs">
      <div class="programlist-tab" :class="{'active':selectedTab===0}" @click="selectTab(0)">详情</div>
      <div class="programlist-tab" :class="{'active':selectedTab===1}" @click="selectTab(1)">节目{{trackTotalCount}}</div>
      <div class="programlist-tab" :class="{'active':selectedTab===2}" @click="selectTab(2)">推荐</div>
    </div>
    <div class="programlist-detail" v-if="selectedTab===0">
      {{mainInfo.detailRichIntro1}}
    </div>
    <div class="programlist-list" v-if="selectedTab===1">
      <div class="programlist-list-item" v-for="(program,index) in programList" @click="gotoListen(program.trackId)">
        <span class="programlist-list-item-index">{{index+1}}</span>
        <span class="programlist-list-item-title">{{program.title}}</span>
      </div>
    </div>
    <div class="programlist-recommend" v-if="selectedTab===2">2</div>
  </div>
</template>

<script>
  export default {
    name: "programList",
    data() {
      return {
        mainInfo: {},
        anchorInfo: {},
        type: {},
        richIntro: "",
        list: [],
        selectedTab: 0,
        trackTotalCount: 0,
        programList:[]
      }
    },
    methods: {
      selectTab(index) {
        switch (index) {
          case 0:
            this.selectedTab = 0;
            break;
          case 1:
            this.selectedTab = 1;
            break;
          case 2:
            this.selectedTab = 2;
            break;
          default:
            break;
        }
      },
      gotoListen(trackId){
        this.$router.push({name:'listen',query:{trackId:trackId}})
      }
    },
    mounted() {
      this.axios.get('src/json/programDetail.json').then(response => {
        console.log('programDetail.json:')
        console.log(response.data)
        this.mainInfo = response.data.data.mainInfo;
        this.anchorInfo = response.data.data.anchorInfo;
        this.type = response.data.data.mainInfo.crumbs.categoryTitle;
      }, function (error) {

      })

      this.axios.get('src/json/page.json').then(response => {
        console.log('page.json:')
        console.log(response.data)
        this.trackTotalCount = response.data.data.trackTotalCount;
        this.programList = response.data.data.tracks;
      }, function (error) {

      })
    }
  }
</script>

<style scoped>
  .programlist {
    position: absolute;
    top: 0;
    left: 0;
    width: 103%;
    height: 100%;
    background: white;
  }

  @keyframes slidein {
    from {
      width: 0px;
    }
    to {
      width: 100%;
    }
  }

  .programlist-header {
    height: 20%;
    background: #ab2f0b;
  }

  .programlist-header-return {
    position: fixed;
    top: 10px;
    left: 12px;
    color: #fff;
    font-size: 20px;
  }

  .programlist-header-img {
    position: relative;
    top: 40px;
    display: inline-block;
    margin-left: 30px;
    width: 130px;
    height: 130px;
    border: 3px solid white;
    border-radius: 12px;
  }

  .programlist-header-title {
    display: inline-block;
    margin: 50px 0 0 10px;
    width: 50%;
  }

  .programlist-header-title-name {
    font-size: 18px;
    font-weight: 400;
    color: #fff;
    letter-spacing: 2px;
  }

  .programlist-header-title-author {
    font-size: 14px;
    color: #fefefe;
    margin-top: 10px;
  }

  .programlist-header-title-type {
    font-size: 14px;
    margin-top: 13px;
  }

  .programlist-header-title-time {
    font-size: 14px;
  }

  .programlist-tabs {
    padding: 22px 0 0 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
  }

  .programlist-tab {
    flex: 1;
    text-align: center;
    line-height: 32px;
    border-bottom: 1px solid #c2bcbc;
    color: #888686;
  }

  .programlist-tab.active {
    border-bottom: 2px solid red;
    color: #000;
  }
  .programlist-detail{
    margin: 15px 20px 15px 15px;
    word-break: break-all;;
    line-height: 29px;
    letter-spacing: 2px;
  }
  .programlist-list-item{
    padding: 10px;
    border-bottom: 1px solid #c2bcbc;
    height: 62px;
  }
  .programlist-list-item:hover{
    background: #edebeb;
  }
  .programlist-list-item-index{
    display: inline-block;
    color: #888686;
    width: 10%;
    line-height: 62px;
  }
  .programlist-list-item-title{
    display: inline-block;
    width: 85%;
    height: 100%;
  }
</style>
