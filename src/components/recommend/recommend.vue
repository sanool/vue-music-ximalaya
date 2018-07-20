<template>
    <div>
      <div class="recommend-slider"></div>
      <div class="recommend-lists">
        <div class="recommend-list" v-for="list in lists">
          <div class="recommend-list-title mb10">{{list.title}}</div>
          <div class="recommend-list-cards">
            <div class="recommend-list-card" @click="gotoDetail(item.albumId)"  v-for="item in list.albumList">
              <img class="recommend-list-card-img" :src="item.albumCoverPath"/>
              <div class="recommend-list-card-listenCount">{{Math.floor(item.albumPlayCount/1000)/10}}w</div>
              <div class="recommend-list-card-title">{{item.albumTitle}}</div>
              <div class="recommend-list-card-author">{{item.albumUserNickName}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="recommend-love"></div>
      <div class="recommend-music"></div>
      <div class="recommend-book"></div>
      <div class="recommend-history"></div>
    </div>
</template>

<script>
    export default {
        name: "recommend",
        data() {
          return {
            lists:[]
         }
        },
        methods:{
          gotoDetail(albumId){
            this.$router.push({name:'programList',query:{albumId:albumId}})
          },
        },
      computed:{

      },
      mounted(){
          // 大坑 --disable-web-security --user-data-dir
          this.axios.get('/api/revision/explore/getRecommend').then( response =>{
            this.lists = response.data.data.cards;
          },function (error) {
            console.log('get guessYouLove.json error')
            alert("error")
          })
      }
    }
</script>

<style scoped>
  .recommend-slider{
    background: yellow;
  }

  .recommend-list{
    background: #fff;
    border-radius: 3px;
    margin: 10px 0;
    padding: 10px;
    overflow: hidden;
  }
 .recommend-list-title{
   font-size: 14px;
   font-weight: bold;
 }

 .recommend-list-cards{
   display: flex;
   flex-direction:row;
   flex-wrap:nowrap;
   overflow:scroll;
 }
 .recommend-list-card{
   position: relative;
   max-width: 100px;
   margin: 5px 10px 0 0;
   padding: 5px;
   border: 1px solid #cbc6c6;
   box-shadow: 0 0 7px #cbc6c6;
 }
 .recommend-list-card:hover{
   box-shadow: 0 0 7px #eb3f17;
 }
  .recommend-list-card-img{
    width: 100px;
    height: 100px;
  }
  .recommend-list-card-listenCount{
    position: absolute;
    top: 5px;
    right: 10px;
    background-image: linear-gradient(90deg,rgba(0,0,0,0) 20%,rgba(0,0,0,.4) 80%);
    color: #fff;
  }
  .recommend-list-card-title{
    font-size: 12px;
    color: #494545;
  }
  .recommend-list-card-author{
    font-size: 12px;
    color: #958e8e;
    margin-top: 5px;
  }
</style>
