<template>
    <div>
      <div class="recommend-slider"></div>
      <div class="recommend-lists">
        <div class="recommend-list" v-for="list in lists">
          <div class="recommend-list-title mb10">{{list.title}}</div>
          <div class="recommend-list-cards" @click="gotoDetail">
            <div class="recommend-list-card" v-for="item in list.albumList">
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
          transferCounts(counts){
            return parseInt(counts)>10000?Math.floor(counts/1000)/10:counts
          },
          gotoDetail(){
            alert("detail")
          }
        },
      computed:{

      },
        mounted(){
          this.axios.get('src/json/guessYouLove.json').then( response =>{
            console.log('guessYouLove.json:')
            console.log(response.data)
            this.lists = response.data.data.cards;
          },function (error) {

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
  }
 .recommend-list-title{
   font-size: 14px;
   font-weight: bold;
 }

 .recommend-list-cards{
   display: flex;
   flex-direction:row;
   flex-wrap:nowrap;
 }
 .recommend-list-card{
   position: relative;
   margin: 5px 10px 0 0;
   padding: 5px;
   border: 1px solid #cbc6c6;
   box-shadow: 2px 2px 7px #cbc6c6;
 }
 .recommend-list-card:hover{
   box-shadow: 2px 2px 7px #eb3f17;
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
