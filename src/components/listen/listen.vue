<template>
  <div class="listen">
    <div class="listen-name"  v-if="listLen>0">{{tracksAudioPlay[playingIndex].trackName}}</div>
    <div class="listen-singer" v-if="listLen>0">{{tracksAudioPlay[playingIndex].albumName}}</div>
    <div class="listen-singer" v-if="isBuffering">loading...</div>
    <div class="listen-middle">
      <div class="listen-middle-panel">
        <div class="listen-middle-panel-div">
          <div class="listen-middle-image-rotate" :class="{'stop':isPaused}">
            <img class="listen-middle-image" v-if="listLen>0"
                 :src="tracksAudioPlay[playingIndex].trackCoverPath"></img>
          </div>
        </div>
      </div>
    </div>
    <div class="listen-bottom">
      <div class="listen-bottom-process">
        <div class="listen-bottom-starttime">{{musicCurTime}}</div>
        <div id="processLineId" class="listen-bottom-process-line" @click="changeProcess($event)">
          <div class="listen-bottom-process-nowlen" :style="{'width':processPercent+'%'}"></div>
        </div>
        <div class="listen-bottom-endtime" v-if="!isBuffering">{{musicTotalTime}}</div>
        <div class="listen-bottom-endtime" v-if="isBuffering">...</div>
      </div>
      <audio id="musicAudio" autoplay="autoplay" :src="tracksAudioPlay.length>0?tracksAudioPlay[playingIndex].src:defaultMusic">
      </audio>
      <div class="listen-bottom-btns">
        <div :class="{'icon-loop':playWay===0,'icon-love':playWay===1,'icon-next':playWay===2}" @click="changePlayWay"></div>
        <div class="icon-previous" @click="previousMusic"></div>
        <div class="listen-play-status" :class="{'icon-play':isPaused,'icon-pause':!isPaused}"
             @click="playOrPause"></div>
        <div class="icon-next" @click="nextMusic"></div>
        <div class="icon-love listen-play-love" :class="{'loved':tracksAudioPlay.length>0&&tracksAudioPlay[playingIndex].isLike}" @click="loveMusic(playingIndex)"></div>
      </div>
    </div>
  </div>
</template>

<script>
  let changeSeconds = function(seconds) {
    let minute = parseInt(Math.floor(seconds / 60), 10)
    let minuteStr = minute < 10 ? ('0' + minute) : minute
    let second = parseInt(Math.floor(seconds % 60), 10)
    let secondStr = second < 10 ? ('0' + second) : second
    return minuteStr + ':' + secondStr
  }
  let randomIndex = function(startNum,endNum) {
    return Math.floor(Math.random()*(endNum-startNum)+startNum)
  }
  export default {
    name: "listen",
    data() {
      return {
        isPaused: false,
        isBuffering: true,
        processPercent: 0,
        musicCurTime: '00:00',
        musicTotalTime: '00:00',
        //http://m10.music.126.net/20180707004158/b8650b5093a7df690cc3c8d926dfbde4/ymusic/7a49/a102/67fa/0635038753930e61a191b9da24e59934.mp3
        playingIndex: 1,
        listLen:0,
        defaultMusic:'/src/json/stay with me.mp3',
        tracksAudioPlay:[],
        playWay:0,
        playWays:['shunxu','suiji','danqu']
      }
    },
    methods: {
      setProcessPercent() {
        this.timeOut = setInterval(() => {
          let duration = musicAudio.duration
          let currentTime = musicAudio.currentTime
          let processPercent = Math.floor(currentTime * 1000 / duration) / 1000
          this.processPercent = processPercent * 100
          this.musicCurTime = changeSeconds(processPercent * duration)
        }, 1000)
      },
      playOrPause() {
        this.isPaused = !this.isPaused
        if (this.isPaused) {
          clearTimeout(this.timeOut)
          musicAudio.pause();
        } else {
          this.setProcessPercent()
          musicAudio.play();
        }
      },
      previousMusic(){
        if(this.playingIndex>0){
          this.playingIndex--
        }
        this.isPaused = false
      },
      nextMusic(){
        let playingIndex = this.playingIndex
        switch (this.playWay){
          case 1:
            this.playingIndex = randomIndex(0,this.tracksAudioPlay.length)
            break;
          default:
            this.playingIndex=(++playingIndex)%(this.tracksAudioPlay.length);
            break;
        }
        this.isPaused = false
      },
      changePlayWay(){
        let playWay = this.playWay
        playWay++
        this.playWay = Math.floor(playWay%3)
        switch (this.playWay){
          case 0:break;
          case 1:{
            // musicAudio.addEventListener("ended", () =>{
            //   this.playingIndex = randomIndex(0,this.tracksAudioPlay.length)
            // },false)
            break;
          }
          case 2:break;
          default:break;
        }
        musicAudio.addEventListener('ended',()=> {
          console.log('end')
        },false)
      },
      loveMusic(){

      },
      changeProcess(event) {
        if (event && event.offsetX) {
          let processDiv = document.getElementById('processLineId');
          let processWidth = processDiv.offsetWidth;
          let offsetX = event.offsetX;
          if (offsetX > 0 && offsetX <= processWidth) {
            let percent = Math.floor(offsetX * 1000 / processWidth) / 1000
            let duration = musicAudio.duration
            this.musicCurTime = changeSeconds(percent*duration)
            this.processPercent = percent * 100
            musicAudio.currentTime =  duration* percent
          }
        }
      }
    },
    computed: {},
    mounted() {
      this.axios.get('src/json/musicList.json').then( (response)=> {
        this.tracksAudioPlay = response.data.data.tracksAudioPlay
        this.listLen = this.tracksAudioPlay.length

        if(musicAudio){
          musicAudio.addEventListener("waiting", () => {
            this.isBuffering = true
          }, false)
          musicAudio.addEventListener("canplaythrough", () => {
            this.isBuffering = false
            let duration = musicAudio.duration
            this.musicTotalTime = changeSeconds(duration)
          }, false)
          musicAudio.addEventListener("ended", () =>{
            let index = this.playingIndex
            index++
            this.playingIndex = index%(this.tracksAudioPlay.length)
          },false)
        }

        if (this.timeOut) {
          clearInterval(this.timeOut)
        }
        this.setProcessPercent()

      },function (error) {
        console.log('get musicList.json error')
      })
    }
  }
</script>

<style scoped>
  .listen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #676562;
  }

  .listen-name {
    font-size: 1.3em;
    color: #fff;
    margin: auto;
    width: 72%;
    white-space: nowrap;
    overflow: hidden;
    padding: 10px;
  }

  .listen-singer {
    margin: auto;
    width: 50%;
    text-align: center;
    padding: 0 10px;
    color: white;
  }

  .listen-middle {
    position: absolute;
    top: 165px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .listen-middle-panel {
    display: inline-block;
    vertical-align: top;
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 80%;
  }

  .listen-middle-panel-div {
    position: absolute;
    left: 15%;
    top: 0;
    width: 70%;
    height: 87%;
  }

  .listen-middle-image-rotate {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 45px solid hsla(0, 0%, 3%, 0.8);
    border-radius: 50%;
    animation: myrotate 20s linear infinite;
  }

  .listen-middle-image-rotate.stop {
    animation-play-state: paused;
  }

  @keyframes myrotate {
    from {
      transform: rotate(0)
    }
    to {
      transform: rotate(1turn)
    }
  }

  .listen-middle-image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .listen-bottom {
    position: fixed;
    bottom: 50px;
    left: 0;
    width: 100%;
  }

  .listen-bottom-process {
    display: block;
    margin: 0 7px 18px 17px;
  }

  .listen-bottom-starttime {
    display: inline-block;
    padding: 0 3px 0 3px;
    color: #fff;
    font-size: 10px;
  }

  .listen-bottom-process-line {
    display: inline-block;
    width: 70%;
    background: #c4bfbf;
    height: 4px;
    margin: 0 0 3px 0;
  }

  .listen-bottom-endtime {
    display: inline-block;
    padding: 0 3px 0 3px;
    color: #e0dede;
    font-size: 10px;
  }

  .listen-bottom-process-nowlen {
    width: 50%;
    background: red;
    height: 4px;
  }

  .listen-bottom-btns {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    font-size: 1.5em;
    color: #fff;
  }

  .listen-play-status {
    font-size: 2em;
  }
  .listen-play-love{
    color: #fff;
  }
  .listen-play-love.loved{
    color:red;
  }
</style>
